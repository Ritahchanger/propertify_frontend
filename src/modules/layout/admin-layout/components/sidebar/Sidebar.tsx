import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Building2,
  Users,
  DollarSign,
  Settings,
  Search,
  ChevronDown,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

// Import sidebar data
import { sidebarSections } from './sidebarmenu';
import { portfolioStats } from './data';

// Redux imports
import type { RootState, AppDispatch } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import {
  closeMobile,
  setActiveItem,
  toggleSection,
} from './SidebarSlice';

interface PropertifySidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

// Constants
const MOBILE_BREAKPOINT = 1024;
const SIDEBAR_WIDTH_COLLAPSED = 'w-16';
const SIDEBAR_WIDTH_EXPANDED = 'w-80';

// Priority badge color mapping
const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-600 border border-red-200',
  medium: 'bg-yellow-100 text-yellow-600 border border-yellow-200',
  low: 'bg-green-100 text-green-600 border border-green-200',
  default: 'bg-blue-100 text-blue-600 border border-blue-200'
} as const;

const PropertifySidebar: React.FC<PropertifySidebarProps> = ({
  isCollapsed: isCollapsedProp = false,
  isMobileOpen = false,
}) => {
  // Local state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Redux state
  const dispatch = useDispatch<AppDispatch>();
  const {
    isCollapsed: isCollapsedRedux,
    expandedSections,
    activeItem,
    isMobileOpen: isMobileOpenRedux
  } = useSelector((state: RootState) => state.sidebar);

  // Determine actual state values (Redux takes precedence)
  const isCollapsed = isCollapsedRedux ?? isCollapsedProp;
  const mobileOpen = isMobileOpenRedux ?? isMobileOpen;

  // Mobile detection effect
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileView);

      // Clear hover state on resize
      setHoveredSection(null);
      setHoveredItem(null);

      // Auto-close mobile menu on desktop
      if (!isMobileView && mobileOpen) {
        dispatch(closeMobile());
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, mobileOpen]);

  // Clear hover state when mobile menu closes
  useEffect(() => {
    if (!mobileOpen) {
      setHoveredSection(null);
      setHoveredItem(null);
    }

    // Cleanup timeout on unmount
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [mobileOpen, hoverTimeout]);

  // Memoized filtered sections for performance
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sidebarSections;

    const query = searchQuery.toLowerCase();
    return sidebarSections
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.label.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        )
      }))
      .filter(section => section.items.length > 0);
  }, [searchQuery]);

  // Event handlers
  const handleSectionToggle = useCallback((sectionId: string) => {
    if (isCollapsed) return;
    dispatch(toggleSection(sectionId));
  }, [dispatch, isCollapsed]);

  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleItemClick = useCallback((itemId: string) => {
    dispatch(setActiveItem(itemId));

    // Close mobile menu when item is selected
    if (isMobile && mobileOpen) {
      dispatch(closeMobile());
    }
  }, [dispatch, isMobile, mobileOpen]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleOverlayClick = useCallback(() => {
    if (isMobile && mobileOpen) {
      dispatch(closeMobile());
    }
  }, [dispatch, isMobile, mobileOpen]);

  // Section hover handlers for collapsed view
  const handleSectionMouseEnter = useCallback((sectionId: string, event: React.MouseEvent) => {
    if (!isMobile && isCollapsed) {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const tooltipHeight = 300; // Approximate tooltip height
      const navbarHeight = 65; // Height of the navbar

      // Calculate y position to keep tooltip in viewport and below navbar
      let yPosition = rect.top + (rect.height / 2);

      // If tooltip would go above navbar, position it below the navbar
      if (yPosition - (tooltipHeight / 2) < navbarHeight) {
        yPosition = navbarHeight + (tooltipHeight / 2) + 10;
      }

      // If tooltip would go below viewport, move it up
      if (yPosition + (tooltipHeight / 2) > viewportHeight) {
        yPosition = viewportHeight - (tooltipHeight / 2) - 10;
      }

      setHoverPosition({
        x: rect.right + 2, // Very small gap to prevent flickering
        y: yPosition
      });
      setHoveredSection(sectionId);
    }
  }, [isMobile, isCollapsed, hoverTimeout]);

  const handleSectionMouseLeave = useCallback((e: React.MouseEvent) => {
    if (!isMobile && isCollapsed) {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }

      // Set a longer delay to allow moving to tooltip
      const timeout = setTimeout(() => {
        setHoveredSection(null);
      }, 300);
      setHoverTimeout(timeout);
    }
  }, [isMobile, isCollapsed, hoverTimeout]);

  // Tooltip hover handlers to keep it open
  const handleTooltipMouseEnter = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [hoverTimeout]);

  const handleTooltipMouseLeave = useCallback(() => {
    setHoveredSection(null);
  }, []);

  // Item hover handlers for expanded view
  const handleItemMouseEnter = useCallback((itemId: string, event: React.MouseEvent) => {
    if (!isMobile && isCollapsed) {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoverPosition({
        x: rect.right + 10,
        y: rect.top + (rect.height / 2)
      });
      setHoveredItem(itemId);
    }
  }, [isMobile, isCollapsed]);

  const handleItemMouseLeave = useCallback(() => {
    if (!isMobile && isCollapsed) {
      setHoveredItem(null);
    }
  }, [isMobile, isCollapsed]);

  // Remove touch handlers to prevent mobile issues
  const handleTouchStart = useCallback(() => {
    // Clear any existing hover state on touch
    setHoveredSection(null);
    setHoveredItem(null);
  }, []);

  // Helper function for priority badge colors
  const getPriorityBadgeColor = useCallback((priority?: string): string => {
    return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.default;
  }, []);

  // Portfolio stats with error handling
  const safePortfolioStats = useMemo(() => ({
    totalProperties: portfolioStats?.totalProperties || 0,
    totalUnits: portfolioStats?.totalUnits || 0,
    occupancyRate: portfolioStats?.occupancyRate || 0,
    monthlyRevenue: portfolioStats?.monthlyRevenue || 0,
    maintenanceRequests: portfolioStats?.maintenanceRequests || 0
  }), []);

  // Find hovered section data for tooltip
  const hoveredSectionData = useMemo(() => {
    if (!hoveredSection) return null;
    return filteredSections.find(section => section.id === hoveredSection);
  }, [hoveredSection, filteredSections]);

  // Find hovered item data for tooltip
  const hoveredItemData = useMemo(() => {
    if (!hoveredItem) return null;

    for (const section of filteredSections) {
      const item = section.items.find(item => item.id === hoveredItem);
      if (item) return item;
    }
    return null;
  }, [hoveredItem, filteredSections]);

  // Determine if we should show the expanded view
  const shouldShowExpanded = !isCollapsed && !isMobile;
  const shouldShowCollapsed = isCollapsed || isMobile;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Section Tooltip - Only show when collapsed on desktop */}
      {!isMobile && isCollapsed && hoveredSection && hoveredSectionData && (
        <div
          className="fixed z-[60] bg-gray-900 text-white text-sm rounded-lg shadow-2xl border border-gray-700 px-4 py-3 max-w-xs transform -translate-y-1/2 max-h-80 overflow-y-auto"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <div className="font-medium text-white mb-2">{hoveredSectionData.label}</div>
          <div className="space-y-2">
            {hoveredSectionData.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigate(item.href);
                  handleItemClick(item.id);
                  setHoveredSection(null); // Close tooltip after click
                }}
                className="w-full text-left text-xs text-gray-300 py-2 px-2 rounded border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="font-medium flex items-center">
                  <item.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-gray-400 mt-0.5">{item.description}</div>
                )}
                {item.badge && (
                  <div className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full mt-1 inline-block">
                    {item.badge}
                  </div>
                )}
              </button>
            ))}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-gray-900"></div>
        </div>
      )}

      {/* Item Tooltip - Only show when expanded and hovering individual items */}
      {!isMobile && !isCollapsed && hoveredItem && hoveredItemData && (
        <div
          className="fixed z-[60] bg-gray-900 text-white text-sm rounded-lg shadow-2xl border border-gray-700 px-4 py-3 max-w-xs pointer-events-none transform -translate-y-1/2"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
          }}
        >
          <div className="font-medium text-white">{hoveredItemData.label}</div>
          {hoveredItemData.description && (
            <div className="text-xs text-gray-300 mt-1 leading-relaxed">
              {hoveredItemData.description}
            </div>
          )}
          {hoveredItemData.badge && (
            <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full mt-2 inline-block">
              {hoveredItemData.badge}
            </div>
          )}
          {/* Tooltip arrow */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-gray-900"></div>
        </div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 top-[65px]
          ${isMobile ? (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isMobile ? SIDEBAR_WIDTH_EXPANDED : (isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED)}
          bg-white border-r border-gray-200 shadow-xl lg:shadow-none
          transition-all duration-300 ease-in-out
          flex flex-col h-[calc(100vh-65px)]
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Portfolio Summary */}
        {shouldShowExpanded && (
          <section
            className="p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200"
            aria-labelledby="portfolio-summary-title"
          >
            <h2 id="portfolio-summary-title" className="sr-only">Portfolio Summary</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/20 hover:bg-white/90 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <span className="text-xs text-gray-600 font-medium">Properties</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{safePortfolioStats.totalProperties}</p>
                <p className="text-xs text-green-600 font-medium">+2 this month</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/20 hover:bg-white/90 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-4 w-4 text-green-600" aria-hidden="true" />
                  <span className="text-xs text-gray-600 font-medium">Units</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{safePortfolioStats.totalUnits}</p>
                <p className="text-xs text-blue-600 font-medium">{safePortfolioStats.occupancyRate}% occupied</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/20 hover:bg-white/90 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-4 w-4 text-purple-600" aria-hidden="true" />
                  <span className="text-xs text-gray-600 font-medium">Revenue</span>
                </div>
                <p className="text-xl font-bold text-gray-900">${safePortfolioStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium">+8.2% vs last month</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/20 hover:bg-white/90 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" aria-hidden="true" />
                  <span className="text-xs text-gray-600 font-medium">Urgent</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{safePortfolioStats.maintenanceRequests}</p>
                <p className="text-xs text-orange-600 font-medium">Maintenance requests</p>
              </div>
            </div>
          </section>
        )}

        {/* Search Bar */}
        {shouldShowExpanded && (
          <section className="p-4 border-b border-gray-200" aria-labelledby="search-title">
            <h3 id="search-title" className="sr-only">Search navigation</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search navigation..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200 bg-gray-50 hover:bg-white"
                aria-label="Search navigation items"
                onTouchStart={handleTouchStart}
              />
            </div>
          </section>
        )}

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="space-y-1">
            {filteredSections.map((section) => (
              <div key={section.id} className="group">
                {/* Section Header */}
                <button
                  onClick={() => handleSectionToggle(section.id)}
                  onMouseEnter={(e) => shouldShowCollapsed ? handleSectionMouseEnter(section.id, e) : undefined}
                  onMouseLeave={shouldShowCollapsed ? handleSectionMouseLeave : undefined}
                  onTouchStart={handleTouchStart}
                  className={`
                    w-full flex items-center justify-between p-3 text-left rounded-xl 
                    hover:bg-gray-50 transition-all duration-200 group/section
                    ${shouldShowCollapsed ? 'justify-center' : ''}
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  `}
                  aria-expanded={expandedSections.includes(section.id)}
                  aria-controls={`section-${section.id}`}
                  title={shouldShowCollapsed ? section.label : undefined}
                >
                  <div className="flex items-center">
                    <section.icon
                      className={`h-5 w-5 text-gray-600 group-hover/section:text-blue-600 transition-colors duration-200 ${shouldShowCollapsed ? '' : 'mr-3'
                        }`}
                      aria-hidden="true"
                    />
                    {!shouldShowCollapsed && (
                      <span className="text-sm font-medium text-gray-700 group-hover/section:text-gray-900">
                        {section.label}
                      </span>
                    )}
                  </div>
                  {!shouldShowCollapsed && (
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expandedSections.includes(section.id) ? 'rotate-180' : ''
                        }`}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Section Items - Only show in expanded view */}
                {!shouldShowCollapsed && (
                  <div
                    id={`section-${section.id}`}
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedSections.includes(section.id) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="space-y-1 mt-1 ml-4">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { handleNavigate(item.href); handleItemClick(item.id); }}
                          onMouseEnter={(e) => handleItemMouseEnter(item.id, e)}
                          onMouseLeave={handleItemMouseLeave}
                          onTouchStart={handleTouchStart}
                          className={`
                            w-full flex items-center justify-between p-3 rounded-xl text-left 
                            transition-all duration-200 group/item relative
                            ${activeItem === item.id
                              ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                          `}
                          aria-current={activeItem === item.id ? 'page' : undefined}
                        >
                          <div className="flex items-center min-w-0 flex-1">
                            <item.icon
                              className={`h-4 w-4 flex-shrink-0 mr-3 ${activeItem === item.id ? 'text-blue-600' : 'text-gray-500'
                                } group-hover/item:scale-110 transition-all duration-200`}
                              aria-hidden="true"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium truncate">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</div>
                              )}
                            </div>
                          </div>

                          {/* Badge */}
                          {item.badge && (
                            <div className="flex-shrink-0 ml-2">
                              <span className={`
                                text-xs font-medium px-2 py-1 rounded-full transition-all duration-200
                                ${getPriorityBadgeColor(item.priority)}
                              `}>
                                {item.badge}
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer Section */}
        <footer className={`p-4 border-t border-gray-200 ${shouldShowCollapsed ? 'px-2' : 'px-4'}`}>
          {!shouldShowCollapsed ? (
            <div className="space-y-2">
              <button
                className="w-full flex items-center p-3 text-left rounded-xl hover:bg-gray-50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500"
                onMouseEnter={(e) => handleItemMouseEnter('help-support', e)}
                onMouseLeave={handleItemMouseLeave}
                onTouchStart={handleTouchStart}
              >
                <HelpCircle className="h-4 w-4 text-gray-500 mr-3 group-hover:text-blue-600 transition-colors duration-200" aria-hidden="true" />
                <div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Help & Support</div>
                  <div className="text-xs text-gray-500">Get assistance</div>
                </div>
              </button>
              <button
                className="w-full flex items-center p-3 text-left rounded-xl hover:bg-gray-50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500"
                onMouseEnter={(e) => handleItemMouseEnter('settings', e)}
                onMouseLeave={handleItemMouseLeave}
                onTouchStart={handleTouchStart}
              >
                <Settings className="h-4 w-4 text-gray-500 mr-3 group-hover:text-blue-600 transition-colors duration-200" aria-hidden="true" />
                <div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Settings</div>
                  <div className="text-xs text-gray-500">Manage preferences</div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                className="w-full p-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Help & Support"
                aria-label="Help & Support"
                onMouseEnter={(e) => handleItemMouseEnter('help-support', e)}
                onMouseLeave={handleItemMouseLeave}
                onTouchStart={handleTouchStart}
              >
                <HelpCircle className="h-4 w-4 mx-auto" />
              </button>
              <button
                className="w-full p-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Settings"
                aria-label="Settings"
                onMouseEnter={(e) => handleItemMouseEnter('settings', e)}
                onMouseLeave={handleItemMouseLeave}
                onTouchStart={handleTouchStart}
              >
                <Settings className="h-4 w-4 mx-auto" />
              </button>
            </div>
          )}
        </footer>
      </aside>
    </>
  );
};

export default PropertifySidebar;
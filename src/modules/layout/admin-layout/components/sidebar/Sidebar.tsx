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
import { quickActions, portfolioStats } from './data';

// Redux imports
import type { RootState, AppDispatch } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { openAddPropertyModal } from '@/modules/property/features/AddPropertyModalSlice';

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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
      setHoveredItem(null);
    }
  }, [mobileOpen]);

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

  // Fixed hover handlers - only show tooltip when collapsed on desktop
  const handleMouseEnter = useCallback((itemId: string, event: React.MouseEvent) => {
    // Only show tooltip when sidebar is collapsed on desktop
    if (!isMobile && isCollapsed) {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoverPosition({
        x: rect.right + 10,
        y: rect.top + (rect.height / 2)
      });
      setHoveredItem(itemId);
    }
  }, [isMobile, isCollapsed]);

  const handleMouseLeave = useCallback(() => {
    // Only clear tooltip when sidebar is collapsed on desktop
    if (!isMobile && isCollapsed) {
      setHoveredItem(null);
    }
  }, [isMobile, isCollapsed]);

  // Remove touch handlers to prevent mobile issues
  const handleTouchStart = useCallback(() => {
    // Clear any existing hover state on touch
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

      {/* Hover Tooltip - Only show when collapsed on desktop */}
      {!isMobile && isCollapsed && hoveredItem && hoveredItemData && (
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

        {/* Quick Actions */}
        {shouldShowExpanded && Array.isArray(quickActions) && quickActions.length > 0 && (
          <section className="p-4 border-b border-gray-200" aria-labelledby="quick-actions-title">
            <h3 id="quick-actions-title" className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className={`
                    flex items-center justify-center p-3 rounded-xl text-white 
                    transition-all duration-200 group hover:shadow-lg hover:scale-105 active:scale-95
                    ${action.color || 'bg-blue-500 hover:bg-blue-600'}
                  `}
                  aria-label={`Quick action: ${action.label}`}
                  onClick={() => {
                    if (action.id === "add-property") {
                      dispatch(openAddPropertyModal())
                    } else {
                      handleNavigate(action.href)
                    }
                  }}
                  onTouchStart={handleTouchStart}
                >
                  <action.icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              ))}
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
                  onMouseEnter={(e) => handleMouseEnter(`section-${section.id}`, e)}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  className={`
                    w-full flex items-center justify-between p-3 text-left rounded-xl 
                    hover:bg-gray-50 transition-all duration-200 group/section
                    ${shouldShowCollapsed ? 'justify-center' : ''}
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  `}
                  aria-expanded={expandedSections.includes(section.id)}
                  aria-controls={`section-${section.id}`}
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

                {/* Section Items */}
                <div
                  id={`section-${section.id}`}
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${(expandedSections.includes(section.id) || shouldShowCollapsed) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className={`space-y-1 ${shouldShowCollapsed ? 'mt-2' : 'mt-1 ml-4'}`}>
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { handleNavigate(item.href); handleItemClick(item.id); }}
                        onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={handleTouchStart}
                        className={`
                          w-full flex items-center justify-between p-3 rounded-xl text-left 
                          transition-all duration-200 group/item relative
                          ${activeItem === item.id
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                          ${shouldShowCollapsed ? 'justify-center' : ''}
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                        `}
                        title={shouldShowCollapsed ? item.label : undefined}
                        aria-current={activeItem === item.id ? 'page' : undefined}
                      >
                        <div className="flex items-center min-w-0 flex-1">
                          <item.icon
                            className={`h-4 w-4 flex-shrink-0 ${activeItem === item.id ? 'text-blue-600' : 'text-gray-500'
                              } group-hover/item:scale-110 transition-all duration-200 ${shouldShowCollapsed ? '' : 'mr-3'
                              }`}
                            aria-hidden="true"
                          />
                          {!shouldShowCollapsed && (
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium truncate">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Badge */}
                        {!shouldShowCollapsed && item.badge && (
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
                onMouseEnter={(e) => handleMouseEnter('help-support', e)}
                onMouseLeave={handleMouseLeave}
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
                onMouseEnter={(e) => handleMouseEnter('settings', e)}
                onMouseLeave={handleMouseLeave}
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
                onMouseEnter={(e) => handleMouseEnter('help-support', e)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
              >
                <HelpCircle className="h-4 w-4 mx-auto" />
              </button>
              <button
                className="w-full p-3 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Settings"
                aria-label="Settings"
                onMouseEnter={(e) => handleMouseEnter('settings', e)}
                onMouseLeave={handleMouseLeave}
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
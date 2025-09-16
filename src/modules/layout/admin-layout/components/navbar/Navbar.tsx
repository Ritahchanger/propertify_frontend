import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Building2,
    Users,
    DollarSign,
    Wrench,
    Bell,
    Settings,
    Search,
    Menu,
    X,
    ChevronDown,
    User,
    LogOut,
    Shield,
    FileText,
    AlertTriangle,
    Clock,
    CreditCard,
    HelpCircle,
    PanelLeftOpen,
    PanelLeftClose,
    Zap,
} from 'lucide-react';

import {
    navigationItems,
    notifications,
    quickActions,
    type UserRole,
    type NotificationItem
} from './data';


import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import {
    toggleCollapse
} from '../sidebar/SidebarSlice';

import { logoutUser } from '@/modules/authentication/user/auth-slice/auth.slice';

import { useNavigate } from 'react-router-dom';

// Types
interface User {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    properties: number;
    units: number;
    monthlyRevenue: string;
    occupancyRate: string;
    joinDate: string;
    plan: string;
}

// Constants
const SCROLL_THRESHOLD = 10;

const PropertifyNavbar: React.FC = () => {
    // Local state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [showQuickActions, setShowQuickActions] = useState<boolean>(false);

    // Redux state and dispatch
    const dispatch = useDispatch<AppDispatch>();
    const { isCollapsed } = useSelector((state: RootState) => state.sidebar);

    const navigate = useNavigate()

    // User data - mock data since no external components
    const user: User = useMemo(() => ({
        name: "Rita Changer",
        email: "rita@propertify.ke",
        role: "owner" as UserRole,
        avatar: "/api/placeholder/40/40",
        properties: 3,
        units: 48,
        monthlyRevenue: "$24,500",
        occupancyRate: "94.2%",
        joinDate: "March 2023",
        plan: "Professional"
    }), []);

    // Computed values with safety checks
    const unreadNotifications = useMemo(() =>
        Array.isArray(notifications) ? notifications.filter(n => !n.read).length : 0,
        []
    );

    const urgentNotifications = useMemo(() =>
        Array.isArray(notifications) ? notifications.filter(n => n.priority === 'high' && !n.read).length : 0,
        []
    );

    const filteredNavItems = useMemo(() =>
        Array.isArray(navigationItems) ? navigationItems.filter(item => item.roles?.includes(user.role)) : [],
        [user.role]
    );

    // Event handlers
    const handleSidebarToggle = useCallback(() => {
        dispatch(toggleCollapse());
    }, [dispatch]);

    const handleMobileMenuToggle = useCallback(() => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }, [isMobileMenuOpen]);

    const handleDropdownToggle = useCallback((itemId: string) => {
        setActiveDropdown(activeDropdown === itemId ? null : itemId);
    }, [activeDropdown]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSearchClear = useCallback(() => {
        setSearchQuery('');
    }, []);

    const handleQuickActionsToggle = useCallback(() => {
        setShowQuickActions(!showQuickActions);
    }, [showQuickActions]);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    // Utility functions
    const getNotificationIcon = useCallback((type: NotificationItem['type']) => {
        const iconMap = {
            payment: DollarSign,
            maintenance: Wrench,
            application: Users,
            lease: FileText,
        };
        return iconMap[type] || Bell;
    }, []);

    const getNotificationColor = useCallback((type: NotificationItem['type'], priority: NotificationItem['priority']) => {
        if (priority === 'high') return 'bg-red-100 text-red-600 border-red-200';

        const colorMap = {
            payment: 'bg-green-100 text-green-600 border-green-200',
            maintenance: 'bg-yellow-100 text-yellow-600 border-yellow-200',
            application: 'bg-blue-100 text-blue-600 border-blue-200',
            lease: 'bg-purple-100 text-purple-600 border-purple-200',
        };
        return colorMap[type] || 'bg-gray-100 text-gray-600 border-gray-200';
    }, []);

    const getRoleBadgeColor = useCallback((role: UserRole): string => {
        const roleColors = {
            owner: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg',
            manager: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg',
            tenant: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg',
            accountant: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg',
        };
        return roleColors[role] || 'bg-gray-100 text-gray-800';
    }, []);

    const getPriorityBadge = useCallback((priority: NotificationItem['priority']) => {
        const priorityColors = {
            high: 'bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium',
            medium: 'bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium',
            low: 'bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium',
        };
        return priorityColors[priority] || 'bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium';
    }, []);

    // Effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
                setIsMobileMenuOpen(false);
            }
            if (activeDropdown && !target.closest('.dropdown-container')) {
                setActiveDropdown(null);
            }
            if (showQuickActions && !target.closest('.quick-actions-container')) {
                setShowQuickActions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen, activeDropdown, showQuickActions]);

    return (
        <>
            <nav className={`bg-white shadow-lg border-b border-gray-100 fixed w-full right-0 left-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl backdrop-blur-md bg-white/95 border-gray-200' : ''
                }`}>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and Brand Section */}
                        <div className="flex items-center justify-items-start">
                            <div className="flex-shrink-0 flex items-center group cursor-pointer">
                                {/* Sidebar Toggle Button */}
                                <div className="mr-4 ml-[-18px] rounded-[2px] bg-blue-500">
                                    <button
                                        onClick={handleSidebarToggle}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                                    >
                                        {isCollapsed ? <PanelLeftOpen className="h-5 w-5" color="#fff" /> : <PanelLeftClose className="h-5 w-5" color="#fff" />}
                                    </button>
                                </div>

                                {/* Logo */}
                                <div className="relative">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                        <Building2 className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                                </div>

                                {/* Brand Text */}
                                <div className="ml-3">
                                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                        Propertify
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500 font-medium">Property Management Suite</span>
                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">Pro</span>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:block ml-10">
                                <div className="flex items-baseline space-x-1">
                                    {filteredNavItems.map((item: any) => (
                                        <div key={item.id} className="relative dropdown-container">
                                            {item.dropdown ? (
                                                <div className="group">
                                                    <button
                                                        className="group flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative"
                                                        onClick={() => handleDropdownToggle(item.id)}
                                                    >
                                                        <item.icon className="h-4 w-4 mr-2.5 group-hover:scale-110 transition-transform duration-200" />
                                                        {item.label}
                                                        {item.badge && (
                                                            <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                        <ChevronDown className={`h-3 w-3 ml-1.5 transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : 'group-hover:rotate-180'
                                                            }`} />
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    <div className={`absolute left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-200 z-50 ${activeDropdown === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                                        }`}>
                                                        <div className="p-3">
                                                            <div className="flex items-center justify-between px-3 py-2 mb-2">
                                                                <div className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                                                                    {item.label}
                                                                </div>
                                                                <span className="text-xs text-gray-500">{item.dropdown?.length || 0} options</span>
                                                            </div>
                                                            <div className="space-y-1">
                                                                {item.dropdown?.map((dropdownItem: any) => (
                                                                    <button
                                                                        key={dropdownItem.href}
                                                                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-150 group"
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <dropdownItem.icon className="h-4 w-4 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
                                                                            <div className="text-left">
                                                                                <div className="font-medium">{dropdownItem.label}</div>
                                                                                {dropdownItem.description && (
                                                                                    <div className="text-xs text-gray-500">{dropdownItem.description}</div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        {dropdownItem.badge && (
                                                                            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                                                                                {dropdownItem.badge}
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group">
                                                    <item.icon className="h-4 w-4 mr-2.5 group-hover:scale-110 transition-transform duration-200" />
                                                    {item.label}
                                                    {item.badge && (
                                                        <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                                                            {item?.badge}
                                                        </span>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right side features */}
                        <div className="flex items-center space-x-3">
                            {/* Quick Actions Button */}
                            <div className="hidden lg:block relative quick-actions-container">
                                <button
                                    onClick={handleQuickActionsToggle}
                                    className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-all duration-200 group"
                                >
                                    <Zap className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-sm font-medium">Quick Actions</span>
                                </button>

                                {showQuickActions && Array.isArray(quickActions) && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                                        <div className="p-3">
                                            <div className="text-sm font-semibold text-gray-800 mb-2">Quick Actions</div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {quickActions.map((action, index) => (
                                                    <button
                                                        key={action.href || index}
                                                        className={`flex items-center p-3 rounded-lg text-white hover:opacity-90 transition-opacity duration-150 ${action.color || 'bg-blue-500'
                                                            }`}
                                                    >
                                                        <action.icon className="h-4 w-4 mr-2" />
                                                        <span className="text-xs font-medium">{action.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Search Bar */}
                            <div className="hidden md:block relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search properties, tenants, payments..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="block w-80 pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={handleSearchClear}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors duration-150"
                                    >
                                        <X className="h-4 w-4 text-gray-400" />
                                    </button>
                                )}
                            </div>

                            {/* Notifications */}
                            <div className="relative group dropdown-container">
                                <button className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                                    <Bell className="h-5 w-5" />
                                    {unreadNotifications > 0 && (
                                        <>
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                                                {unreadNotifications}
                                            </span>
                                            {urgentNotifications > 0 && (
                                                <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                                            )}
                                        </>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {Array.isArray(notifications) && (
                                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                                <div className="flex items-center space-x-2">
                                                    {urgentNotifications > 0 && (
                                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium flex items-center">
                                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                                            {urgentNotifications} urgent
                                                        </span>
                                                    )}
                                                    {unreadNotifications > 0 && (
                                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                                                            {unreadNotifications} new
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => {
                                                const IconComponent = getNotificationIcon(notification.type);
                                                return (
                                                    <div
                                                        key={notification.id}
                                                        className={`flex items-start p-4 hover:bg-gray-50 transition-colors duration-150 border-l-4 ${!notification.read ? 'bg-blue-50/50 border-l-blue-500' : 'border-l-transparent'
                                                            } ${notification.priority === 'high' ? 'border-l-red-500 bg-red-50/30' : ''}`}
                                                    >
                                                        <div className={`p-2.5 rounded-lg mr-3 border ${getNotificationColor(notification.type, notification.priority)}`}>
                                                            <IconComponent className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                                    {notification.title}
                                                                </p>
                                                                <div className="flex items-center space-x-1">
                                                                    <span className={getPriorityBadge(notification.priority)}>
                                                                        {notification.priority}
                                                                    </span>
                                                                    {notification.priority === 'high' && (
                                                                        <AlertTriangle className="h-3 w-3 text-red-500" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                                    <span className="flex items-center">
                                                                        <Clock className="h-3 w-3 mr-1" />
                                                                        {notification.time}
                                                                    </span>
                                                                    {notification.property && (
                                                                        <span className="flex items-center">
                                                                            <Building2 className="h-3 w-3 mr-1" />
                                                                            {notification.property}
                                                                        </span>
                                                                    )}
                                                                    {notification.amount && (
                                                                        <span className="flex items-center font-medium text-green-600">
                                                                            <DollarSign className="h-3 w-3 mr-1" />
                                                                            {notification.amount}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="p-4 border-t border-gray-100 bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors duration-150">
                                                    Mark all as read
                                                </button>
                                                <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors duration-150">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Menu */}
                            <div className="relative group dropdown-container">
                                <button className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2 transition-all duration-200">
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <div className="flex items-center space-x-2">
                                            <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${getRoleBadgeColor(user.role)}`}>
                                                Property Owner
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {user.properties} properties • {user.occupancyRate}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
                                </button>

                                {/* User Dropdown */}
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {/* User Profile Header */}
                                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                                <div className="flex items-center mt-1 space-x-2">
                                                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getRoleBadgeColor(user.role)}`}>
                                                        Property Owner
                                                    </span>
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
                                                        {user.plan} Plan
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Portfolio Stats */}
                                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">{user.properties}</div>
                                                <div className="text-xs text-gray-500">Properties</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">{user.units}</div>
                                                <div className="text-xs text-gray-500">Total Units</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-green-600">{user.monthlyRevenue}</div>
                                                <div className="text-xs text-gray-500">Monthly Revenue</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-blue-600">{user.occupancyRate}</div>
                                                <div className="text-xs text-gray-500">Occupancy Rate</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="p-2">
                                        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
                                            <User className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
                                            <div className="text-left">
                                                <div className="font-medium">Profile Settings</div>
                                                <div className="text-xs text-gray-500">Manage your account details</div>
                                            </div>
                                        </button>
                                        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
                                            <Settings className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
                                            <div className="text-left">
                                                <div className="font-medium">Account Settings</div>
                                                <div className="text-xs text-gray-500">Preferences and configurations</div>
                                            </div>
                                        </button>
                                        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
                                            <CreditCard className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
                                            <div className="text-left">
                                                <div className="font-medium">Billing & Subscription</div>
                                                <div className="text-xs text-gray-500">Manage your {user.plan} plan</div>
                                            </div>
                                        </button>
                                        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
                                            <Shield className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
                                            <div className="text-left">
                                                <div className="font-medium">Security</div>
                                                <div className="text-xs text-gray-500">Password and authentication</div>
                                            </div>
                                        </button>
                                        <button className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150 group">
                                            <HelpCircle className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
                                            <div className="text-left">
                                                <div className="font-medium">Help & Support</div>
                                                <div className="text-xs text-gray-500">Get assistance and documentation</div>
                                            </div>
                                        </button>

                                        <div className="border-t border-gray-100 mt-2 pt-2">
                                            <button className="w-full flex items-center px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-150 group"
                                                onClick={handleLogout}
                                            >
                                                <LogOut className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-150" />
                                                <div className="text-left">
                                                    <div className="font-medium">Sign Out</div>
                                                    <div className="text-xs text-red-400">End your current session</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={handleMobileMenuToggle}
                                    className="mobile-menu-button p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                                    aria-label="Open mobile menu"
                                >
                                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`lg:hidden mobile-menu transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="px-4 pt-2 pb-6 space-y-2 border-t border-gray-100 bg-white shadow-lg">
                        {/* Mobile Search */}
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-sm transition-all duration-200"
                            />
                        </div>

                        {/* Mobile Navigation Items */}
                        {filteredNavItems.map((item) => (
                            <div key={item.id} className="space-y-1">
                                <button
                                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors duration-150"
                                    onClick={() => item.dropdown && handleDropdownToggle(`mobile-${item.id}`)}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="h-5 w-5 mr-3" />
                                        <span className="font-medium">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    {item.dropdown && (
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === `mobile-${item.id}` ? 'rotate-180' : ''
                                            }`} />
                                    )}
                                </button>

                                {/* Mobile Dropdown Items */}
                                {item.dropdown && activeDropdown === `mobile-${item.id}` && (
                                    <div className="pl-8 space-y-1">
                                        {item.dropdown.map((dropdownItem) => (
                                            <button
                                                key={dropdownItem.href}
                                                className="w-full flex items-center px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-150"
                                            >
                                                <dropdownItem.icon className="h-4 w-4 mr-3" />
                                                <div className="text-left">
                                                    <div className="font-medium">{dropdownItem.label}</div>
                                                    {dropdownItem.description && (
                                                        <div className="text-xs text-gray-500">{dropdownItem.description}</div>
                                                    )}
                                                </div>
                                                {dropdownItem.badge && (
                                                    <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                                                        {dropdownItem.badge}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Mobile Quick Actions */}
                        {Array.isArray(quickActions) && quickActions.length > 0 && (
                            <div className="border-t border-gray-100 pt-4 mt-4">
                                <div className="px-4 mb-3">
                                    <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Quick Actions</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2 px-2">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={action.href || index}
                                            className={`flex items-center justify-center p-3 rounded-xl text-white hover:opacity-90 transition-opacity duration-150 ${action.color || 'bg-blue-500'
                                                }`}
                                        >
                                            <action.icon className="h-4 w-4 mr-2" />
                                            <span className="text-sm font-medium">{action.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mobile User Info */}
                        <div className="border-t border-gray-100 pt-4 mt-4">
                            <div className="flex items-center px-4 py-2">
                                <div className="relative">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                    <div className="flex items-center mt-1">Property 'badge' does not exist on type 'never'.ts(2339)
                                        any
                                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${getRoleBadgeColor(user.role)}`}>
                                            Property Owner
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="h-16"></div>
        </>
    );
};

export default PropertifyNavbar;
import React, { useState } from 'react';
import {
    Bell,
    Building2,
    ChevronDown,
    CreditCard,
    DollarSign,
    FileText,
    Home,
    TrendingUp,
    MessageSquare,
    Settings,
    Shield,
    Users,
    Wrench,
    Wifi,
    Search,
    LogOut,
    User,
    HelpCircle,
    BarChart3,
    Award,
    Star,
    MapPin,
    Clock,
    Eye
} from 'lucide-react';


import { Button } from '@/shared/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

import { formatTime, formatDate } from '@/shared/utils';


// Mock user data
const currentUser = {
    name: "Rita Changer",
    email: "rita@propertify.ke",
    role: "Owner",
    avatar: "/api/placeholder/40/40",
    estates: ["Eastlands Plaza", "Westside Gardens", "Downtown Heights"],
    monthlyRevenue: "KES 120,000",
    totalProperties: 12,
    totalTenants: 45,
    rating: 4.8,
    occupancyRate: 92,
    isOnline: true,
    memberSince: "Jan 2021",
    lastLogin: "2024-10-01 09:15 AM"
};

// Navigation items based on user roles
const getNavigationItems = (userRole: string) => {
    const baseItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Properties', href: '/properties', icon: Building2 },
    ];

    const roleSpecificItems = {
        Owner: [
            { name: 'Analytics', href: '/analytics', icon: BarChart3 },
            { name: 'Financial Reports', href: '/financial-reports', icon: DollarSign },
            { name: 'User Management', href: '/users', icon: Users },
            { name: 'Estate Settings', href: '/estate-settings', icon: Settings },
        ],
        Manager: [
            { name: 'Tenants', href: '/tenants', icon: Users },
            { name: 'Applications', href: '/applications', icon: FileText },
            { name: 'Maintenance', href: '/maintenance', icon: Wrench },
            { name: 'Payments', href: '/payments', icon: CreditCard },
            { name: 'Reports', href: '/reports', icon: BarChart3 },
        ],
        Tenant: [
            { name: 'My Lease', href: '/my-lease', icon: FileText },
            { name: 'Payments', href: '/my-payments', icon: CreditCard },
            { name: 'Maintenance', href: '/my-maintenance', icon: Wrench },
            { name: 'Messages', href: '/messages', icon: MessageSquare },
        ],
        Accountant: [
            { name: 'Invoices', href: '/invoices', icon: FileText },
            { name: 'Payments', href: '/payments', icon: CreditCard },
            { name: 'Expenses', href: '/expenses', icon: DollarSign },
            { name: 'Reports', href: '/financial-reports', icon: BarChart3 },
        ]
    };

    return [...baseItems, ...(roleSpecificItems[userRole as keyof typeof roleSpecificItems] || [])];
};

const notifications = [
    {
        id: 1,
        type: 'payment',
        title: 'Payment Received',
        message: 'John Doe paid KES 25,000 for Unit A101',
        time: '5 minutes ago',
        unread: true
    },
    {
        id: 2,
        type: 'maintenance',
        title: 'Urgent Maintenance Request',
        message: 'Water leakage reported in Unit B203',
        time: '1 hour ago',
        unread: true
    },
    {
        id: 3,
        type: 'application',
        title: 'New Tenant Application',
        message: 'Mary Smith applied for Unit C105',
        time: '3 hours ago',
        unread: false
    }
];

const PropertifyNavbar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const navigationItems = getNavigationItems(currentUser.role);
    const unreadNotifications = notifications.filter(n => n.unread).length;

    const [currentTime, setCurrentTime] = useState(new Date());


    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'payment': return <CreditCard className="h-4 w-4 text-green-500" />;
            case 'maintenance': return <Wrench className="h-4 w-4 text-orange-500" />;
            case 'application': return <FileText className="h-4 w-4 text-blue-500" />;
            default: return <Bell className="h-4 w-4" />;
        }
    };




    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
            <div className="mx-auto">
                {/* Main Navbar Row */}
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-sm shadow-md">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <div className="hidden md:block">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Propertify
                                </h1>
                                <p className="text-xs text-gray-500 font-medium">Real Estate Management</p>
                            </div>
                        </div>
                    </div>

                    {/* Center - Real-time Clock and Date */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <div className="flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-sm border">
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <div className="text-center">
                                    <div className="text-lg font-mono font-bold text-gray-900">
                                        {formatTime(currentTime)}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">
                                        {formatDate(currentTime)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Owner Stats */}
                        <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-sm border border-blue-200">
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{currentUser.monthlyRevenue}</div>
                                    <div className="text-xs text-gray-500">Monthly Revenue</div>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4 text-blue-600" />
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{currentUser.totalProperties}</div>
                                    <div className="text-xs text-gray-500">Properties</div>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-purple-600" />
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{currentUser.totalTenants}</div>
                                    <div className="text-xs text-gray-500">Tenants</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-3">
                        {/* Search */}
                        <div className="hidden md:block relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search properties, tenants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-10 pr-4 py-2 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {/* Estate Selector (for multi-estate users) */}
                        {currentUser.estates.length > 1 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center space-x-2 border-gray-300 hover:bg-gray-50">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                        <span className="hidden md:inline font-medium">Eastlands Plaza</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Select Estate</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {currentUser.estates.map((estate) => (
                                        <DropdownMenuItem key={estate}>
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span>{estate}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        {/* Notifications */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                                    <Bell className="h-5 w-5" />
                                    {unreadNotifications > 0 && (
                                        <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                                            {unreadNotifications}
                                        </Badge>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel className="flex items-center justify-between">
                                    Notifications
                                    <Badge variant="secondary">{unreadNotifications} new</Badge>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
                                            {getNotificationIcon(notification.type)}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {notification.unread && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-center text-blue-600 hover:bg-blue-50">
                                    View all notifications
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User Menu with Enhanced Details */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50">
                                    <div className="relative">
                                        <Avatar className="h-9 w-9 border-2 border-blue-200">
                                            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                            <AvatarFallback className="bg-blue-600 text-white font-semibold">
                                                {currentUser.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        {currentUser.isOnline && (
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                                {currentUser.role}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center space-x-1 mt-0.5">
                                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                            <span className="text-xs text-gray-500">{currentUser.rating} Rating</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">{currentUser.occupancyRate}% Occupancy</span>
                                        </div>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>
                                    <div className="flex items-start space-x-3 p-2">
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 border-2 border-blue-200">
                                                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                                <AvatarFallback className="bg-blue-600 text-white font-semibold text-lg">
                                                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            {currentUser.isOnline && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                    <Wifi className="h-2 w-2 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <p className="font-semibold text-gray-900">{currentUser.name}</p>
                                                <Award className="h-4 w-4 text-yellow-500" />
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{currentUser.email}</p>
                                            <div className="flex items-center space-x-3 text-xs">
                                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                    {currentUser.role}
                                                </Badge>
                                                <span className="text-gray-500">Member since {currentUser.memberSince}</span>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
                                                <Eye className="h-3 w-3" />
                                                <span>Last login: {currentUser.lastLogin}</span>
                                            </div>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {/* Quick Stats */}
                                <div className="px-2 py-3 bg-gray-50 mx-2 rounded-sm mb-2">
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div>
                                            <div className="text-lg font-bold text-blue-600">{currentUser.totalProperties}</div>
                                            <div className="text-xs text-gray-500">Properties</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-green-600">{currentUser.occupancyRate}%</div>
                                            <div className="text-xs text-gray-500">Occupancy</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-yellow-600">{currentUser.rating}</div>
                                            <div className="text-xs text-gray-500">Rating</div>
                                        </div>
                                    </div>
                                </div>

                                <DropdownMenuItem className="hover:bg-gray-50">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gray-50">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Account Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gray-50">
                                    <Shield className="mr-2 h-4 w-4" />
                                    <span>Security & Privacy</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="hover:bg-gray-50">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    <span>Help & Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Secondary Row - Navigation Items (Mobile/Tablet) */}
                <div className="lg:hidden mt-4 border-t pt-3">
                    <div className="flex items-center space-x-1 overflow-x-auto pb-2">
                        {navigationItems.slice(0, 6).map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.name}
                                    variant={activeItem === item.name ? "default" : "ghost"}
                                    size="sm"
                                    className="flex items-center space-x-2 px-3 py-2 whitespace-nowrap"
                                    onClick={() => setActiveItem(item.name)}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm">{item.name}</span>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PropertifyNavbar;
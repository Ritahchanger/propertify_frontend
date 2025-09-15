import {
    Building2,
    Users,
    DollarSign,
    Wrench,
    Settings,
    Shield,
    Home,
    FileText,
    BarChart3,
    Calendar,
    MessageSquare,
    Plus,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Clock,
    Star,
    Eye,
    Phone,
    CreditCard,
    Download,
    Upload,
    Calculator
} from "lucide-react"
const notifications = [
    {
        id: '1',
        type: 'payment' as const,
        title: 'Rent Payment Received',
        message: 'John Doe paid $1,200 for Apartment 4B at Sunset Gardens',
        time: '2 hours ago',
        read: false,
        priority: 'low' as const,
        property: 'Sunset Gardens',
        amount: '$1,200'
    },
    {
        id: '2',
        type: 'maintenance' as const,
        title: 'Urgent Maintenance Request',
        message: 'Water leak reported in Building A, Unit 12 - requires immediate attention',
        time: '4 hours ago',
        read: false,
        priority: 'high' as const,
        property: 'Oak Street Complex',
        tenant: 'Sarah Wilson'
    },
    {
        id: '3',
        type: 'application' as const,
        title: 'New Tenant Application',
        message: 'Michael Johnson applied for 2BR unit at Pine Valley Apartments',
        time: '1 day ago',
        read: true,
        priority: 'medium' as const,
        property: 'Pine Valley',
        unit: '2BR - Unit 15C'
    },
    {
        id: '4',
        type: 'maintenance' as const,
        title: 'Scheduled Inspection Reminder',
        message: 'Annual fire safety inspection scheduled for tomorrow at Oak Street Properties',
        time: '2 days ago',
        read: false,
        priority: 'medium' as const,
        property: 'Oak Street Properties',
        date: 'Tomorrow, 9:00 AM'
    },
    {
        id: '5',
        type: 'payment' as const,
        title: 'Late Payment Alert',
        message: 'Rent payment 5 days overdue - Unit 7C, Pine Valley Apartments',
        time: '5 days ago',
        read: false,
        priority: 'high' as const,
        property: 'Pine Valley',
        tenant: 'Emma Davis',
        amount: '$980'
    },
    {
        id: '6',
        type: 'lease' as const,
        title: 'Lease Renewal Due',
        message: 'Lease expires in 30 days - Unit 3A, Sunset Gardens',
        time: '1 week ago',
        read: false,
        priority: 'medium' as const,
        property: 'Sunset Gardens',
        tenant: 'Robert Kim',
        expiryDate: 'March 15, 2025'
    }
];

const navigationItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: BarChart3,
        href: '/dashboard',
        roles: ['owner'],
        badge: null,
        dropdown: null,
        description: 'Overview of your property portfolio'
    },
    {
        id: 'properties',
        label: 'Properties',
        icon: Building2,
        href: '/properties',
        roles: ['owner'],
        badge: null,
        dropdown: [
            { label: 'All Properties', icon: Building2, href: '/properties/all', badge: 12, description: 'View all your properties' },
            { label: 'Vacant Units', icon: Home, href: '/properties/vacant', badge: 3, description: 'Available rental units' },
            { label: 'Occupied Units', icon: Users, href: '/properties/occupied', badge: 45, description: 'Currently rented units' },
            { label: 'Property Performance', icon: TrendingUp, href: '/properties/analytics', badge: null, description: 'Analytics and insights' },
            { label: 'Property Photos', icon: Eye, href: '/properties/photos', badge: null, description: 'Manage property images' },
            { label: 'Add New Property', icon: Plus, href: '/properties/add', badge: null, description: 'List a new property' }
        ]
    },
    {
        id: 'tenants',
        label: 'Tenants',
        icon: Users,
        href: '/tenants',
        roles: ['owner'],
        badge: 2,
        dropdown: [
            { label: 'All Tenants', icon: Users, href: '/tenants/all', badge: 45, description: 'Manage current tenants' },
            { label: 'Tenant Applications', icon: FileText, href: '/tenants/applications', badge: 2, description: 'Review new applications' },
            { label: 'Lease Management', icon: FileText, href: '/tenants/leases', badge: null, description: 'Lease agreements and renewals' },
            { label: 'Lease Renewals', icon: Calendar, href: '/tenants/renewals', badge: 5, description: 'Upcoming lease renewals' },
            { label: 'Tenant Screening', icon: Shield, href: '/tenants/screening', badge: null, description: 'Background checks and verification' },
            { label: 'Tenant Communication', icon: MessageSquare, href: '/tenants/messages', badge: 7, description: 'Messages and announcements' },
            { label: 'Move-in/Move-out', icon: Calendar, href: '/tenants/moving', badge: null, description: 'Track tenant transitions' }
        ]
    },
    {
        id: 'financial',
        label: 'Financial',
        icon: DollarSign,
        href: '/financial',
        roles: ['owner'],
        badge: null,
        dropdown: [
            { label: 'Income Dashboard', icon: TrendingUp, href: '/financial/income', badge: null, description: 'Revenue tracking and analysis' },
            { label: 'Rent Collection', icon: DollarSign, href: '/financial/rent', badge: null, description: 'Track rent payments' },
            { label: 'Late Payments', icon: AlertTriangle, href: '/financial/late', badge: 3, description: 'Overdue rent tracking' },
            { label: 'Expenses & Bills', icon: FileText, href: '/financial/expenses', badge: null, description: 'Property expenses and utilities' },
            { label: 'Financial Reports', icon: BarChart3, href: '/financial/reports', badge: null, description: 'Profit/loss and cash flow' },
            { label: 'Tax Documents', icon: FileText, href: '/financial/taxes', badge: null, description: 'Tax preparation documents' },
            { label: 'Bank Accounts', icon: CreditCard, href: '/financial/accounts', badge: null, description: 'Manage payment accounts' }
        ]
    },
    {
        id: 'maintenance',
        label: 'Maintenance',
        icon: Wrench,
        href: '/maintenance',
        roles: ['owner'],
        badge: 6,
        dropdown: [
            { label: 'Active Requests', icon: AlertTriangle, href: '/maintenance/active', badge: 4, description: 'Urgent maintenance issues' },
            { label: 'Scheduled Maintenance', icon: Calendar, href: '/maintenance/scheduled', badge: 2, description: 'Planned maintenance work' },
            { label: 'Work Orders', icon: FileText, href: '/maintenance/orders', badge: null, description: 'Create and manage work orders' },
            { label: 'Completed Jobs', icon: CheckCircle, href: '/maintenance/completed', badge: null, description: 'Maintenance history' },
            { label: 'Contractor Network', icon: Users, href: '/maintenance/contractors', badge: null, description: 'Manage service providers' },
            { label: 'Preventive Maintenance', icon: Clock, href: '/maintenance/preventive', badge: null, description: 'Scheduled upkeep tasks' },
            { label: 'Maintenance Costs', icon: DollarSign, href: '/maintenance/costs', badge: null, description: 'Expense tracking' }
        ]
    },
    {
        id: 'reports',
        label: 'Reports & Analytics',
        icon: FileText,
        href: '/reports',
        roles: ['owner'],
        badge: null,
        dropdown: [
            { label: 'Performance Dashboard', icon: BarChart3, href: '/reports/performance', badge: null, description: 'Key performance indicators' },
            { label: 'Occupancy Reports', icon: Users, href: '/reports/occupancy', badge: null, description: 'Vacancy and occupancy rates' },
            { label: 'Financial Summaries', icon: DollarSign, href: '/reports/financial', badge: null, description: 'Income and expense reports' },
            { label: 'Rent Roll Reports', icon: FileText, href: '/reports/rentroll', badge: null, description: 'Tenant and rent information' },
            { label: 'Maintenance Analytics', icon: Wrench, href: '/reports/maintenance', badge: null, description: 'Maintenance cost analysis' },
            { label: 'Market Analysis', icon: TrendingUp, href: '/reports/market', badge: null, description: 'Local market trends' },
            { label: 'Custom Reports', icon: Settings, href: '/reports/custom', badge: null, description: 'Create custom reports' },
            { label: 'Export Data', icon: Download, href: '/reports/export', badge: null, description: 'Download reports and data' }
        ]
    },
    {
        id: 'tools',
        label: 'Tools',
        icon: Settings,
        href: '/tools',
        roles: ['owner'],
        badge: null,
        dropdown: [
            { label: 'Document Center', icon: FileText, href: '/tools/documents', badge: null, description: 'Lease templates and forms' },
            { label: 'Rent Calculator', icon: Calculator, href: '/tools/calculator', badge: null, description: 'Market rent analysis' },
            { label: 'Bulk Operations', icon: Upload, href: '/tools/bulk', badge: null, description: 'Import/export tenant data' },
            { label: 'Property Valuation', icon: TrendingUp, href: '/tools/valuation', badge: null, description: 'Estimate property values' },
            { label: 'Marketing Tools', icon: Star, href: '/tools/marketing', badge: null, description: 'Create property listings' },
            { label: 'Mobile App', icon: Phone, href: '/tools/mobile', badge: null, description: 'Download mobile app' }
        ]
    }
];

// Quick action items for property owners
const quickActions = [
    { label: 'Add Tenant', icon: Plus, href: '/tenants/add', color: 'bg-blue-500' },
    { label: 'Collect Rent', icon: DollarSign, href: '/financial/collect', color: 'bg-green-500' },
    { label: 'Create Work Order', icon: Wrench, href: '/maintenance/create', color: 'bg-orange-500' },
    { label: 'Generate Report', icon: FileText, href: '/reports/generate', color: 'bg-purple-500' }
];

type UserRole = 'owner' | 'manager' | 'tenant' | 'accountant';
type NotificationItem = typeof notifications[0];



export { navigationItems, notifications, quickActions, type UserRole, type NotificationItem }
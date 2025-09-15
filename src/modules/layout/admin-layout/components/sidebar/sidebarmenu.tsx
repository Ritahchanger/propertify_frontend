
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

    TrendingUp,
    AlertTriangle,
    Star,
    CreditCard,
    RefreshCw,
    Calculator,
    PieChart,
    LineChart,
    Activity,
    Archive,
    Database,
    Globe,
    Smartphone,
    Camera,
    Package,
    Truck,
    Target,
    ClipboardList,
} from 'lucide-react';
const sidebarSections = [
    {
        id: 'overview',
        label: 'Overview',
        icon: BarChart3,
        items: [
            {
                id: 'dashboard',
                label: 'Dashboard',
                icon: BarChart3,
                href: '/dashboard',
                badge: null,
                description: 'Portfolio overview and key metrics'
            },
            {
                id: 'analytics',
                label: 'Analytics Hub',
                icon: Activity,
                href: '/analytics',
                badge: null,
                description: 'Advanced portfolio analytics'
            },
            {
                id: 'performance',
                label: 'Performance',
                icon: TrendingUp,
                href: '/performance',
                badge: null,
                description: 'ROI and performance tracking'
            }
        ]
    },
    {
        id: 'properties',
        label: 'Property Management',
        icon: Building2,
        items: [
            {
                id: 'all-properties',
                label: 'All Properties',
                icon: Building2,
                href: '/dashboard/property',
                badge: 12,
                description: 'Manage your property portfolio'
            },
            {
                id: 'vacant-units',
                label: 'Vacant Units',
                icon: Home,
                href: '/dashboard/properties/vacant',
                badge: 3,
                description: 'Available rental units',
                priority: 'medium'
            },
            {
                id: 'occupied-units',
                label: 'Occupied Units',
                icon: Users,
                href: '/properties/occupied',
                badge: 45,
                description: 'Currently rented units'
            },
            {
                id: 'property-photos',
                label: 'Property Media',
                icon: Camera,
                href: '/properties/media',
                badge: null,
                description: 'Photos and virtual tours'
            },
            {
                id: 'amenities',
                label: 'Amenities',
                icon: Star,
                href: '/properties/amenities',
                badge: null,
                description: 'Property features and amenities'
            },
            {
                id: 'property-documents',
                label: 'Documents',
                icon: FileText,
                href: '/properties/documents',
                badge: null,
                description: 'Property-related documents'
            }
        ]
    },
    {
        id: 'tenants',
        label: 'Tenant Management',
        icon: Users,
        items: [
            {
                id: 'all-tenants',
                label: 'All Tenants',
                icon: Users,
                href: '/tenants',
                badge: 45,
                description: 'Manage current tenants'
            },
            {
                id: 'applications',
                label: 'Applications',
                icon: ClipboardList,
                href: '/tenants/applications',
                badge: 2,
                description: 'Review new tenant applications',
                priority: 'high'
            },
            {
                id: 'screening',
                label: 'Tenant Screening',
                icon: Shield,
                href: '/tenants/screening',
                badge: null,
                description: 'Background checks and verification'
            },
            {
                id: 'lease-management',
                label: 'Lease Management',
                icon: FileText,
                href: '/tenants/leases',
                badge: null,
                description: 'Lease agreements and terms'
            },
            {
                id: 'lease-renewals',
                label: 'Lease Renewals',
                icon: RefreshCw,
                href: '/tenants/renewals',
                badge: 5,
                description: 'Upcoming lease renewals',
                priority: 'medium'
            },
            {
                id: 'move-inout',
                label: 'Move In/Out',
                icon: Truck,
                href: '/tenants/moving',
                badge: null,
                description: 'Track tenant transitions'
            },
            {
                id: 'tenant-communication',
                label: 'Communication',
                icon: MessageSquare,
                href: '/tenants/messages',
                badge: 7,
                description: 'Messages and announcements'
            }
        ]
    },
    {
        id: 'financial',
        label: 'Financial Management',
        icon: DollarSign,
        items: [
            {
                id: 'income-dashboard',
                label: 'Income Overview',
                icon: TrendingUp,
                href: '/financial/income',
                badge: null,
                description: 'Revenue tracking and analysis'
            },
            {
                id: 'rent-collection',
                label: 'Rent Collection',
                icon: DollarSign,
                href: '/financial/rent',
                badge: null,
                description: 'Track rent payments'
            },
            {
                id: 'late-payments',
                label: 'Late Payments',
                icon: AlertTriangle,
                href: '/financial/late',
                badge: 3,
                description: 'Overdue rent tracking',
                priority: 'high'
            },
            {
                id: 'expenses',
                label: 'Expenses & Bills',
                icon: CreditCard,
                href: '/financial/expenses',
                badge: null,
                description: 'Property expenses and utilities'
            },
            {
                id: 'financial-reports',
                label: 'Financial Reports',
                icon: PieChart,
                href: '/financial/reports',
                badge: null,
                description: 'Profit/loss and cash flow'
            },
            {
                id: 'tax-documents',
                label: 'Tax Documents',
                icon: Archive,
                href: '/financial/taxes',
                badge: null,
                description: 'Tax preparation documents'
            },
            {
                id: 'banking',
                label: 'Bank Accounts',
                icon: CreditCard,
                href: '/financial/accounts',
                badge: null,
                description: 'Manage payment accounts'
            }
        ]
    },
    {
        id: 'maintenance',
        label: 'Maintenance & Services',
        icon: Wrench,
        items: [
            {
                id: 'active-requests',
                label: 'Active Requests',
                icon: AlertTriangle,
                href: '/maintenance/active',
                badge: 4,
                description: 'Urgent maintenance issues',
                priority: 'high'
            },
            {
                id: 'scheduled-maintenance',
                label: 'Scheduled Work',
                icon: Calendar,
                href: '/maintenance/scheduled',
                badge: 2,
                description: 'Planned maintenance work'
            },
            {
                id: 'work-orders',
                label: 'Work Orders',
                icon: ClipboardList,
                href: '/maintenance/orders',
                badge: null,
                description: 'Create and manage work orders'
            },
            {
                id: 'contractor-network',
                label: 'Contractors',
                icon: Users,
                href: '/maintenance/contractors',
                badge: null,
                description: 'Manage service providers'
            },
            {
                id: 'preventive-maintenance',
                label: 'Preventive Care',
                icon: Shield,
                href: '/maintenance/preventive',
                badge: null,
                description: 'Scheduled upkeep tasks'
            },
            {
                id: 'maintenance-history',
                label: 'History & Logs',
                icon: Archive,
                href: '/maintenance/history',
                badge: null,
                description: 'Completed maintenance records'
            },
            {
                id: 'maintenance-costs',
                label: 'Cost Tracking',
                icon: BarChart3,
                href: '/maintenance/costs',
                badge: null,
                description: 'Maintenance expense analysis'
            }
        ]
    },
    {
        id: 'reports',
        label: 'Reports & Analytics',
        icon: FileText,
        items: [
            {
                id: 'performance-dashboard',
                label: 'Performance Dashboard',
                icon: Activity,
                href: '/reports/performance',
                badge: null,
                description: 'Key performance indicators'
            },
            {
                id: 'occupancy-reports',
                label: 'Occupancy Reports',
                icon: PieChart,
                href: '/reports/occupancy',
                badge: null,
                description: 'Vacancy and occupancy rates'
            },
            {
                id: 'financial-summaries',
                label: 'Financial Summaries',
                icon: LineChart,
                href: '/reports/financial',
                badge: null,
                description: 'Income and expense reports'
            },
            {
                id: 'rent-roll',
                label: 'Rent Roll Reports',
                icon: Database,
                href: '/reports/rentroll',
                badge: null,
                description: 'Tenant and rent information'
            },
            {
                id: 'market-analysis',
                label: 'Market Analysis',
                icon: Globe,
                href: '/reports/market',
                badge: null,
                description: 'Local market trends'
            },
            {
                id: 'custom-reports',
                label: 'Custom Reports',
                icon: Settings,
                href: '/reports/custom',
                badge: null,
                description: 'Create custom reports'
            }
        ]
    },
    {
        id: 'tools',
        label: 'Tools & Utilities',
        icon: Settings,
        items: [
            {
                id: 'document-center',
                label: 'Document Center',
                icon: Archive,
                href: '/tools/documents',
                badge: null,
                description: 'Templates and forms'
            },
            {
                id: 'rent-calculator',
                label: 'Rent Calculator',
                icon: Calculator,
                href: '/tools/calculator',
                badge: null,
                description: 'Market rent analysis'
            },
            {
                id: 'bulk-operations',
                label: 'Bulk Operations',
                icon: Package,
                href: '/tools/bulk',
                badge: null,
                description: 'Import/export data'
            },
            {
                id: 'marketing-tools',
                label: 'Marketing Suite',
                icon: Target,
                href: '/tools/marketing',
                badge: null,
                description: 'Property listings and ads'
            },
            {
                id: 'mobile-app',
                label: 'Mobile App',
                icon: Smartphone,
                href: '/tools/mobile',
                badge: null,
                description: 'Download mobile app'
            }
        ]
    }
];


export { sidebarSections }
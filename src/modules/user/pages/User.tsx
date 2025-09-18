import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/components/ui/dialog';
import {
    Users,
    UserPlus,
    Search,
    Download,
    Eye,
    Edit,
    Phone,
    Mail,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    TrendingDown,
    Home,
    Key,
    Shield,
    FileText,
    Plus,
    Calculator
} from 'lucide-react';
import Layout from '@/modules/layout/admin-layout/Layout';

// Types
interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'tenant' | 'manager' | 'accountant';
    status: 'active' | 'inactive' | 'pending';
    avatar?: string;
    joinDate: string;
    lastActive: string;
}

interface Tenant extends User {
    role: 'tenant';
    unitId?: string;
    propertyName?: string;
    unitNumber?: string;
    leaseStart?: string;
    leaseEnd?: string;
    rent: number;
    deposit: number;
    emergencyContact: {
        name: string;
        phone: string;
        relationship: string;
    };
    documents: TenantDocument[];
    screening?: ScreeningData;
    moveInDate?: string;
    moveOutDate?: string;
    moveOutReason?: string;
}

interface TenantApplication {
    id: string;
    applicantName: string;
    email: string;
    phone: string;
    propertyName: string;
    unitNumber: string;
    applicationDate: string;
    status: 'pending' | 'reviewing' | 'approved' | 'rejected';
    documents: ApplicationDocument[];
    screening?: ScreeningData;
    monthlyIncome: number;
    employmentStatus: string;
    previousRental: string;
    references: Reference[];
    notes?: string;
}

interface TenantDocument {
    id: string;
    type: string;
    name: string;
    uploadDate: string;
    status: 'pending' | 'verified' | 'rejected';
}

interface ApplicationDocument {
    id: string;
    type: 'id' | 'income' | 'employment' | 'reference' | 'other';
    name: string;
    uploadDate: string;
    verified: boolean;
}

interface ScreeningData {
    creditScore: number;
    backgroundCheck: 'pass' | 'fail' | 'pending';
    incomeVerification: 'verified' | 'pending' | 'failed';
    referenceCheck: 'positive' | 'negative' | 'pending';
    overallScore: number;
    recommendation: 'approve' | 'reject' | 'review';
    notes?: string;
}

interface Reference {
    name: string;
    relationship: string;
    phone: string;
    email: string;
    contacted: boolean;
    response?: 'positive' | 'negative' | 'neutral';
}

interface MoveTransition {
    id: string;
    tenantId: string;
    tenantName: string;
    type: 'move-in' | 'move-out' | 'unit-transfer';
    fromUnit?: string;
    toUnit?: string;
    property: string;
    date: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    checklist: ChecklistItem[];
    notes?: string;
    costs?: {
        deposit?: number;
        fees?: number;
        refund?: number;
    };
}

interface ChecklistItem {
    id: string;
    task: string;
    completed: boolean;
    assignee?: string;
    dueDate?: string;
}

// Mock Data
const mockUsers: User[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phone: '+254 712 345 678',
        role: 'tenant',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-09-18'
    },
    {
        id: '2',
        name: 'David Manager',
        email: 'david.manager@company.com',
        phone: '+254 711 234 567',
        role: 'manager',
        status: 'active',
        joinDate: '2023-06-10',
        lastActive: '2024-09-18'
    },
    {
        id: '3',
        name: 'Sarah Accountant',
        email: 'sarah.acc@company.com',
        phone: '+254 710 123 456',
        role: 'accountant',
        status: 'active',
        joinDate: '2023-03-20',
        lastActive: '2024-09-17'
    }
];

const mockTenants: Tenant[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phone: '+254 712 345 678',
        role: 'tenant',
        status: 'active',
        joinDate: '2024-01-15',
        lastActive: '2024-09-18',
        propertyName: 'Kilimani Heights',
        unitNumber: 'A201',
        leaseStart: '2024-01-15',
        leaseEnd: '2024-12-31',
        rent: 55000,
        deposit: 110000,
        moveInDate: '2024-01-15',
        emergencyContact: {
            name: 'John Johnson',
            phone: '+254 722 111 222',
            relationship: 'Brother'
        },
        documents: [
            { id: '1', type: 'ID Copy', name: 'national_id.pdf', uploadDate: '2024-01-10', status: 'verified' },
            { id: '2', type: 'Lease Agreement', name: 'lease_signed.pdf', uploadDate: '2024-01-15', status: 'verified' }
        ]
    },
    {
        id: '4',
        name: 'Michael Brown',
        email: 'michael.brown@email.com',
        phone: '+254 713 456 789',
        role: 'tenant',
        status: 'inactive',
        joinDate: '2023-08-01',
        lastActive: '2024-08-31',
        propertyName: 'Westlands Plaza',
        unitNumber: 'B105',
        leaseStart: '2023-08-01',
        leaseEnd: '2024-08-31',
        rent: 65000,
        deposit: 130000,
        moveInDate: '2023-08-01',
        moveOutDate: '2024-08-31',
        moveOutReason: 'Job relocation',
        emergencyContact: {
            name: 'Linda Brown',
            phone: '+254 733 444 555',
            relationship: 'Sister'
        },
        documents: [
            { id: '3', type: 'ID Copy', name: 'id_copy.pdf', uploadDate: '2023-07-25', status: 'verified' },
            { id: '4', type: 'Move-out Inspection', name: 'moveout_report.pdf', uploadDate: '2024-08-31', status: 'verified' }
        ]
    }
];

const mockApplications: TenantApplication[] = [
    {
        id: '1',
        applicantName: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+254 714 567 890',
        propertyName: 'Karen Gardens',
        unitNumber: 'C301',
        applicationDate: '2024-09-15',
        status: 'reviewing',
        monthlyIncome: 180000,
        employmentStatus: 'Full-time',
        previousRental: 'Lived in Kileleshwa for 2 years',
        documents: [
            { id: '1', type: 'id', name: 'national_id.pdf', uploadDate: '2024-09-15', verified: true },
            { id: '2', type: 'income', name: 'payslip.pdf', uploadDate: '2024-09-15', verified: false },
            { id: '3', type: 'employment', name: 'employment_letter.pdf', uploadDate: '2024-09-16', verified: false }
        ],
        references: [
            { name: 'Previous Landlord', relationship: 'Landlord', phone: '+254 720 111 333', email: 'landlord@email.com', contacted: false },
            { name: 'HR Manager', relationship: 'Employer', phone: '+254 721 222 444', email: 'hr@company.com', contacted: false }
        ],
        screening: {
            creditScore: 720,
            backgroundCheck: 'pending',
            incomeVerification: 'pending',
            referenceCheck: 'pending',
            overallScore: 75,
            recommendation: 'review'
        }
    },
    {
        id: '2',
        applicantName: 'James Kamau',
        email: 'james.kamau@email.com',
        phone: '+254 715 678 901',
        propertyName: 'Kilimani Heights',
        unitNumber: 'A105',
        applicationDate: '2024-09-12',
        status: 'approved',
        monthlyIncome: 220000,
        employmentStatus: 'Full-time',
        previousRental: 'First time renter',
        documents: [
            { id: '4', type: 'id', name: 'id_copy.pdf', uploadDate: '2024-09-12', verified: true },
            { id: '5', type: 'income', name: 'salary_certificate.pdf', uploadDate: '2024-09-12', verified: true },
            { id: '6', type: 'employment', name: 'contract.pdf', uploadDate: '2024-09-12', verified: true }
        ],
        references: [
            { name: 'Supervisor', relationship: 'Supervisor', phone: '+254 722 333 555', email: 'sup@company.com', contacted: true, response: 'positive' },
            { name: 'Personal Reference', relationship: 'Friend', phone: '+254 723 444 666', email: 'friend@email.com', contacted: true, response: 'positive' }
        ],
        screening: {
            creditScore: 780,
            backgroundCheck: 'pass',
            incomeVerification: 'verified',
            referenceCheck: 'positive',
            overallScore: 92,
            recommendation: 'approve'
        }
    }
];

const mockTransitions: MoveTransition[] = [
    {
        id: '1',
        tenantId: '1',
        tenantName: 'Alice Johnson',
        type: 'move-in',
        toUnit: 'A201',
        property: 'Kilimani Heights',
        date: '2024-01-15',
        status: 'completed',
        checklist: [
            { id: '1', task: 'Key handover', completed: true, assignee: 'Property Manager' },
            { id: '2', task: 'Unit inspection', completed: true, assignee: 'Maintenance' },
            { id: '3', task: 'Utility setup', completed: true, assignee: 'Admin' },
            { id: '4', task: 'Welcome package', completed: true, assignee: 'Reception' }
        ],
        costs: {
            deposit: 110000,
            fees: 5000
        }
    },
    {
        id: '2',
        tenantId: '4',
        tenantName: 'Michael Brown',
        type: 'move-out',
        fromUnit: 'B105',
        property: 'Westlands Plaza',
        date: '2024-08-31',
        status: 'completed',
        checklist: [
            { id: '5', task: 'Final inspection', completed: true, assignee: 'Property Manager' },
            { id: '6', task: 'Key collection', completed: true, assignee: 'Security' },
            { id: '7', task: 'Utility disconnection', completed: true, assignee: 'Admin' },
            { id: '8', task: 'Deposit refund', completed: true, assignee: 'Accounts' }
        ],
        costs: {
            refund: 125000
        },
        notes: 'Unit left in good condition. Minor cleaning required.'
    },
    {
        id: '3',
        tenantId: '5',
        tenantName: 'James Kamau',
        type: 'move-in',
        toUnit: 'A105',
        property: 'Kilimani Heights',
        date: '2024-09-25',
        status: 'scheduled',
        checklist: [
            { id: '9', task: 'Pre-move inspection', completed: false, assignee: 'Maintenance', dueDate: '2024-09-24' },
            { id: '10', task: 'Key preparation', completed: false, assignee: 'Security', dueDate: '2024-09-24' },
            { id: '11', task: 'Utility activation', completed: false, assignee: 'Admin', dueDate: '2024-09-25' },
            { id: '12', task: 'Welcome orientation', completed: false, assignee: 'Property Manager', dueDate: '2024-09-25' }
        ],
        costs: {
            deposit: 130000,
            fees: 6000
        }
    }
];

const UserManagementDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showAddUserDialog, setShowAddUserDialog] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'reviewing': return 'bg-blue-100 text-blue-800';
            case 'scheduled': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'tenant': return <Home className="w-4 h-4" />;
            case 'manager': return <Shield className="w-4 h-4" />;
            case 'accountant': return <Calculator className="w-4 h-4" />;
            default: return <Users className="w-4 h-4" />;
        }
    };

    const getScreeningColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const tenantStats = {
        total: mockTenants.length,
        active: mockTenants.filter(t => t.status === 'active').length,
        inactive: mockTenants.filter(t => t.status === 'inactive').length,
        occupancyRate: (mockTenants.filter(t => t.status === 'active').length / mockTenants.length) * 100
    };

    const applicationStats = {
        total: mockApplications.length,
        pending: mockApplications.filter(a => a.status === 'pending').length,
        reviewing: mockApplications.filter(a => a.status === 'reviewing').length,
        approved: mockApplications.filter(a => a.status === 'approved').length,
        rejected: mockApplications.filter(a => a.status === 'rejected').length
    };

    return (
        <Layout>
            <div className="p-6 space-y-6">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-600 mt-1">Manage tenants, applications, and staff members</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                            <DialogTrigger asChild>
                                <Button>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Add User
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add New User</DialogTitle>
                                    <DialogDescription>Create a new user account</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="Enter full name" />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Enter email" />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" placeholder="Enter phone number" />
                                    </div>
                                    <div>
                                        <Label htmlFor="role">Role</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tenant">Tenant</SelectItem>
                                                <SelectItem value="manager">Manager</SelectItem>
                                                <SelectItem value="accountant">Accountant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={() => setShowAddUserDialog(false)}>
                                            Create User
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockUsers.length}</div>
                            <div className="flex items-center text-xs text-green-600">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +12% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
                            <Home className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenantStats.active}</div>
                            <p className="text-xs text-muted-foreground">
                                {tenantStats.occupancyRate.toFixed(1)}% occupancy rate
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{applicationStats.pending + applicationStats.reviewing}</div>
                            <p className="text-xs text-muted-foreground">
                                Needs review
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Move Transitions</CardTitle>
                            <Key className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockTransitions.filter(t => t.status === 'scheduled').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Scheduled this month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="tenants">Tenants</TabsTrigger>
                        <TabsTrigger value="applications">Applications</TabsTrigger>
                        <TabsTrigger value="screening">Screening</TabsTrigger>
                        <TabsTrigger value="transitions">Move In/Out</TabsTrigger>
                        <TabsTrigger value="staff">Staff</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest user activities and updates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { action: 'New application submitted', user: 'Emma Wilson', time: '2 hours ago', type: 'application' },
                                            { action: 'Tenant moved out', user: 'Michael Brown', time: '1 day ago', type: 'move-out' },
                                            { action: 'Application approved', user: 'James Kamau', time: '2 days ago', type: 'approval' },
                                            { action: 'Screening completed', user: 'Sarah Smith', time: '3 days ago', type: 'screening' }
                                        ].map((activity, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${activity.type === 'application' ? 'bg-blue-500' :
                                                        activity.type === 'move-out' ? 'bg-red-500' :
                                                            activity.type === 'approval' ? 'bg-green-500' :
                                                                'bg-yellow-500'
                                                        }`} />
                                                    <div>
                                                        <div className="font-medium">{activity.action}</div>
                                                        <div className="text-sm text-gray-600">{activity.user}</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-500">{activity.time}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Application Pipeline</CardTitle>
                                    <CardDescription>Current application status breakdown</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Pending Review</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{applicationStats.pending}</span>
                                                <Badge variant="outline">New</Badge>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Under Review</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{applicationStats.reviewing}</span>
                                                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Approved</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{applicationStats.approved}</span>
                                                <Badge className="bg-green-100 text-green-800">Ready</Badge>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Rejected</span>
                                            <span className="text-lg font-bold">{applicationStats.rejected}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>Common tasks and shortcuts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <UserPlus className="w-8 h-8" />
                                        <span>Add New Tenant</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <FileText className="w-8 h-8" />
                                        <span>Review Applications</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <Key className="w-8 h-8" />
                                        <span>Schedule Move-in</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <Download className="w-8 h-8" />
                                        <span>Generate Report</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tenants Tab */}
                    <TabsContent value="tenants" className="space-y-6">
                        {/* Filters */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex-1 min-w-64">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <Input
                                                placeholder="Search tenants..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tenants List */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {mockTenants.map((tenant) => (
                                <Card key={tenant.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Home className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{tenant.name}</h3>
                                                    <p className="text-sm text-gray-600">{tenant.propertyName} - {tenant.unitNumber}</p>
                                                    <p className="text-xs text-gray-500">Rent: {formatCurrency(tenant.rent)}</p>
                                                </div>
                                            </div>
                                            <Badge className={getStatusColor(tenant.status)}>
                                                {tenant.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span>{tenant.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span>{tenant.phone}</span>
                                            </div>
                                            {tenant.leaseEnd && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                                                    <span>Lease ends: {new Date(tenant.leaseEnd).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                            {tenant.moveOutDate && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Clock className="w-4 h-4 text-red-400" />
                                                    <span>Moved out: {new Date(tenant.moveOutDate).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center pt-3">
                                                <div className="text-xs text-gray-500">
                                                    Documents: {tenant.documents.filter(d => d.status === 'verified').length}/{tenant.documents.length} verified
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Applications Tab */}
                    <TabsContent value="applications" className="space-y-6">
                        <div className="space-y-6">
                            {mockApplications.map((application) => (
                                <Card key={application.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg">{application.applicantName}</h3>
                                                <p className="text-gray-600">{application.propertyName} - Unit {application.unitNumber}</p>
                                                <p className="text-sm text-gray-500">Applied: {new Date(application.applicationDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Badge className={getStatusColor(application.status)}>
                                                    {application.status}
                                                </Badge>
                                                {application.screening && (
                                                    <Badge variant="outline" className={getScreeningColor(application.screening.overallScore)}>
                                                        Score: {application.screening.overallScore}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">Contact Information</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Mail className="w-4 h-4 text-gray-400" />
                                                            <span>{application.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="w-4 h-4 text-gray-400" />
                                                            <span>{application.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-medium mb-2">Employment & Income</h4>
                                                    <div className="space-y-1 text-sm">
                                                        <p><span className="text-gray-600">Monthly Income:</span> {formatCurrency(application.monthlyIncome)}</p>
                                                        <p><span className="text-gray-600">Employment:</span> {application.employmentStatus}</p>
                                                        <p><span className="text-gray-600">Previous Rental:</span> {application.previousRental}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-medium mb-2">Documents</h4>
                                                    <div className="space-y-2">
                                                        {application.documents.map((doc) => (
                                                            <div key={doc.id} className="flex items-center justify-between text-sm">
                                                                <span>{doc.name}</span>
                                                                {doc.verified ? (
                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <Clock className="w-4 h-4 text-yellow-600" />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">References</h4>
                                                    <div className="space-y-2">
                                                        {application.references.map((ref, idx) => (
                                                            <div key={idx} className="text-sm">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-medium">{ref.name}</span>
                                                                    {ref.contacted ? (
                                                                        <Badge className={
                                                                            ref.response === 'positive' ? 'bg-green-100 text-green-800' :
                                                                                ref.response === 'negative' ? 'bg-red-100 text-red-800' :
                                                                                    'bg-gray-100 text-gray-800'
                                                                        }>
                                                                            {ref.response}
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge variant="outline">Pending</Badge>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-600">{ref.relationship}</p>
                                                                <p className="text-gray-500">{ref.phone}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {application.screening && (
                                                    <div>
                                                        <h4 className="font-medium mb-2">Screening Results</h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span>Credit Score:</span>
                                                                <span className="font-semibold">{application.screening.creditScore}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Background Check:</span>
                                                                <Badge className={getStatusColor(application.screening.backgroundCheck)}>
                                                                    {application.screening.backgroundCheck}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Income Verification:</span>
                                                                <Badge className={getStatusColor(application.screening.incomeVerification)}>
                                                                    {application.screening.incomeVerification}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span>Reference Check:</span>
                                                                <Badge className={getStatusColor(application.screening.referenceCheck)}>
                                                                    {application.screening.referenceCheck}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex justify-between pt-2 border-t">
                                                                <span className="font-medium">Overall Score:</span>
                                                                <span className={`font-bold ${getScreeningColor(application.screening.overallScore)}`}>
                                                                    {application.screening.overallScore}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                                            <Button variant="outline" size="sm">
                                                <FileText className="w-4 h-4 mr-2" />
                                                View Details
                                            </Button>
                                            {application.status === 'reviewing' && (
                                                <>
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                        <XCircle className="w-4 h-4 mr-2" />
                                                        Reject
                                                    </Button>
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Approve
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Screening Tab */}
                    <TabsContent value="screening" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tenant Screening Overview</CardTitle>
                                <CardDescription>Automated and manual screening results</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-600">85%</div>
                                        <p className="text-sm text-gray-600">Average Credit Score</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600">92%</div>
                                        <p className="text-sm text-gray-600">Background Check Pass Rate</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-purple-600">78%</div>
                                        <p className="text-sm text-gray-600">Application Approval Rate</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {mockApplications.filter(app => app.screening).map((application) => (
                                <Card key={application.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{application.applicantName}</h3>
                                                <p className="text-sm text-gray-600">{application.propertyName} - {application.unitNumber}</p>
                                            </div>
                                            <Badge className={getStatusColor(application.screening!.recommendation)}>
                                                {application.screening!.recommendation}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">Overall Score</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className={`h-2 rounded-full ${application.screening!.overallScore >= 80 ? 'bg-green-500' :
                                                                application.screening!.overallScore >= 60 ? 'bg-yellow-500' :
                                                                    'bg-red-500'
                                                                }`}
                                                            style={{ width: `${application.screening!.overallScore}%` }}
                                                        />
                                                    </div>
                                                    <span className={`font-bold ${getScreeningColor(application.screening!.overallScore)}`}>
                                                        {application.screening!.overallScore}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Credit Score</span>
                                                    <span className="font-semibold">{application.screening!.creditScore}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span>Background Check</span>
                                                    <Badge className={getStatusColor(application.screening!.backgroundCheck)}>
                                                        {application.screening!.backgroundCheck}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span>Income Verification</span>
                                                    <Badge className={getStatusColor(application.screening!.incomeVerification)}>
                                                        {application.screening!.incomeVerification}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span>References</span>
                                                    <Badge className={getStatusColor(application.screening!.referenceCheck)}>
                                                        {application.screening!.referenceCheck}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {application.screening!.notes && (
                                                <div>
                                                    <p className="text-sm font-medium">Notes:</p>
                                                    <p className="text-sm text-gray-600">{application.screening!.notes}</p>
                                                </div>
                                            )}

                                            <div className="flex justify-end gap-2 pt-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Details
                                                </Button>
                                                <Button size="sm">
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    Report
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Move Transitions Tab */}
                    <TabsContent value="transitions" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Move In/Out Management</h3>
                                <p className="text-gray-600">Track and manage tenant transitions</p>
                            </div>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Schedule Transition
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {mockTransitions.map((transition) => (
                                <Card key={transition.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${transition.type === 'move-in' ? 'bg-green-100' :
                                                    transition.type === 'move-out' ? 'bg-red-100' :
                                                        'bg-blue-100'
                                                    }`}>
                                                    {transition.type === 'move-in' ? <TrendingUp className="w-6 h-6 text-green-600" /> :
                                                        transition.type === 'move-out' ? <TrendingDown className="w-6 h-6 text-red-600" /> :
                                                            <Key className="w-6 h-6 text-blue-600" />}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{transition.tenantName}</h3>
                                                    <p className="text-gray-600 capitalize">{transition.type.replace('-', ' ')}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {transition.property} - {transition.fromUnit || transition.toUnit}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge className={getStatusColor(transition.status)}>
                                                    {transition.status}
                                                </Badge>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(transition.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-medium mb-3">Checklist Progress</h4>
                                                <div className="space-y-2">
                                                    {transition.checklist.map((item) => (
                                                        <div key={item.id} className="flex items-center gap-2">
                                                            {item.completed ? (
                                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                            ) : (
                                                                <Clock className="w-4 h-4 text-gray-400" />
                                                            )}
                                                            <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>
                                                                {item.task}
                                                            </span>
                                                            {item.assignee && (
                                                                <Badge variant="outline" className="ml-auto text-xs">
                                                                    {item.assignee}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-3 pt-3 border-t">
                                                    <div className="flex justify-between text-sm">
                                                        <span>Progress:</span>
                                                        <span className="font-semibold">
                                                            {transition.checklist.filter(item => item.completed).length}/{transition.checklist.length}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                {transition.costs && (
                                                    <div>
                                                        <h4 className="font-medium mb-3">Financial Summary</h4>
                                                        <div className="space-y-2 text-sm">
                                                            {transition.costs.deposit && (
                                                                <div className="flex justify-between">
                                                                    <span>Deposit:</span>
                                                                    <span className="font-semibold">{formatCurrency(transition.costs.deposit)}</span>
                                                                </div>
                                                            )}
                                                            {transition.costs.fees && (
                                                                <div className="flex justify-between">
                                                                    <span>Processing Fees:</span>
                                                                    <span className="font-semibold">{formatCurrency(transition.costs.fees)}</span>
                                                                </div>
                                                            )}
                                                            {transition.costs.refund && (
                                                                <div className="flex justify-between">
                                                                    <span>Refund Amount:</span>
                                                                    <span className="font-semibold text-green-600">{formatCurrency(transition.costs.refund)}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {transition.notes && (
                                                    <div className="mt-4">
                                                        <h4 className="font-medium mb-2">Notes</h4>
                                                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                                            {transition.notes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                                            <Button variant="outline" size="sm">
                                                <FileText className="w-4 h-4 mr-2" />
                                                View Details
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Edit className="w-4 h-4 mr-2" />
                                                Update
                                            </Button>
                                            {transition.status === 'scheduled' && (
                                                <Button size="sm">
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Mark Complete
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Staff Tab */}
                    <TabsContent value="staff" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {mockUsers.filter(user => user.role !== 'tenant').map((staff) => (
                                <Card key={staff.id}>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                {getRoleIcon(staff.role)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{staff.name}</h3>
                                                <p className="text-sm text-gray-600 capitalize">{staff.role}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span>{staff.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span>{staff.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                                <span>Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span>Last active: {new Date(staff.lastActive).toLocaleDateString()}</span>
                                            </div>

                                            <div className="flex justify-between items-center pt-3">
                                                <Badge className={getStatusColor(staff.status)}>
                                                    {staff.status}
                                                </Badge>
                                                <div className="flex gap-1">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Staff Performance Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Staff Performance Overview</CardTitle>
                                <CardDescription>Key performance indicators for staff members</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">98%</div>
                                        <p className="text-sm text-gray-600">Task Completion Rate</p>
                                        <p className="text-xs text-gray-500">Property Managers</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">24h</div>
                                        <p className="text-sm text-gray-600">Avg Response Time</p>
                                        <p className="text-xs text-gray-500">Tenant Inquiries</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">95%</div>
                                        <p className="text-sm text-gray-600">Accuracy Rate</p>
                                        <p className="text-xs text-gray-500">Financial Processing</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default UserManagementDashboard;
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { Progress } from '@/lib/components/ui/progress';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    ComposedChart
} from 'recharts';
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Home,
    Receipt,
    FileText,
    AlertTriangle,
    CheckCircle,
    Clock,
    Download,
    CreditCard,
    Building2,
    Plus,
    Eye,
    Edit,
    Trash2,
} from 'lucide-react';
import Layout from '@/modules/layout/admin-layout/Layout';

const FinancialOverview = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedProperty, setSelectedProperty] = useState('all');

    // Mock data - replace with actual API calls
    const financialData = {
        totalIncome: 2850000,
        totalExpenses: 980000,
        netIncome: 1870000,
        occupancyRate: 92,
        pendingPayments: 450000,
        collectionRate: 87,
    };

    const rentCollection = {
        collected: 2400000,
        pending: 450000,
        overdue: 125000,
        total: 2975000
    };

    const properties = [
        { id: 1, name: 'Kilimani Heights', units: 24, occupied: 22, income: 1200000 },
        { id: 2, name: 'Westlands Plaza', units: 18, occupied: 16, income: 950000 },
        { id: 3, name: 'Karen Gardens', units: 12, occupied: 11, income: 700000 }
    ];

    const expenses = [
        { category: 'Maintenance', amount: 320000, percentage: 33 },
        { category: 'Utilities', amount: 180000, percentage: 18 },
        { category: 'Security', amount: 150000, percentage: 15 },
        { category: 'Management Fees', amount: 200000, percentage: 20 },
        { category: 'Insurance', amount: 80000, percentage: 8 },
        { category: 'Others', amount: 50000, percentage: 5 }
    ];

    const taxDocuments = [
        {
            id: 1,
            type: 'VAT Returns',
            period: 'Q1 2024',
            status: 'submitted',
            dueDate: '2024-04-30',
            amount: 285000,
            description: 'Quarterly VAT returns for all properties'
        },
        {
            id: 2,
            type: 'Income Tax',
            period: '2023',
            status: 'pending',
            dueDate: '2024-06-30',
            amount: 450000,
            description: 'Annual income tax declaration'
        },
        {
            id: 3,
            type: 'Withholding Tax',
            period: 'March 2024',
            status: 'overdue',
            dueDate: '2024-04-20',
            amount: 75000,
            description: 'Withholding tax on rental income'
        },
        {
            id: 4,
            type: 'Property Tax',
            period: 'Q2 2024',
            status: 'draft',
            dueDate: '2024-07-31',
            amount: 320000,
            description: 'Property rates for all managed properties'
        },
        {
            id: 5,
            type: 'Stamp Duty',
            period: 'April 2024',
            status: 'submitted',
            dueDate: '2024-05-15',
            amount: 125000,
            description: 'Stamp duty on new lease agreements'
        }
    ];

    const bankAccounts = [
        {
            id: 1,
            bankName: 'KCB Bank',
            accountNumber: '****1234',
            accountType: 'Current Account',
            balance: 2850000,
            status: 'active',
            lastTransaction: '2024-09-15',
            isPrimary: true
        },
        {
            id: 2,
            bankName: 'Equity Bank',
            accountNumber: '****5678',
            accountType: 'Savings Account',
            balance: 1200000,
            status: 'active',
            lastTransaction: '2024-09-14',
            isPrimary: false
        },
        {
            id: 3,
            bankName: 'Co-operative Bank',
            accountNumber: '****9012',
            accountType: 'Current Account',
            balance: 650000,
            status: 'active',
            lastTransaction: '2024-09-13',
            isPrimary: false
        },
        {
            id: 4,
            bankName: 'NCBA Bank',
            accountNumber: '****3456',
            accountType: 'Fixed Deposit',
            balance: 5000000,
            status: 'locked',
            lastTransaction: '2024-08-01',
            isPrimary: false
        }
    ];

    // Chart data
    const incomeVsExpensesData = [
        { month: 'Jan', income: 2400000, expenses: 890000, net: 1510000 },
        { month: 'Feb', income: 2600000, expenses: 920000, net: 1680000 },
        { month: 'Mar', income: 2750000, expenses: 980000, net: 1770000 },
        { month: 'Apr', income: 2850000, expenses: 1050000, net: 1800000 },
        { month: 'May', income: 2900000, expenses: 980000, net: 1920000 },
        { month: 'Jun', income: 2850000, expenses: 980000, net: 1870000 }
    ];

    const expenseDistribution = [
        { name: 'Maintenance', value: 320000, color: '#8884d8' },
        { name: 'Utilities', value: 180000, color: '#82ca9d' },
        { name: 'Security', value: 150000, color: '#ffc658' },
        { name: 'Management', value: 200000, color: '#ff7300' },
        { name: 'Insurance', value: 80000, color: '#00c49f' },
        { name: 'Others', value: 50000, color: '#ffbb28' }
    ];

    const rentCollectionTrend = [
        { month: 'Jan', collected: 2200000, pending: 200000, total: 2400000, rate: 92 },
        { month: 'Feb', collected: 2340000, pending: 260000, total: 2600000, rate: 90 },
        { month: 'Mar', collected: 2475000, pending: 275000, total: 2750000, rate: 90 },
        { month: 'Apr', collected: 2565000, pending: 285000, total: 2850000, rate: 90 },
        { month: 'May', collected: 2610000, pending: 290000, total: 2900000, rate: 90 },
        { month: 'Jun', collected: 2400000, pending: 450000, total: 2850000, rate: 84 }
    ];

    const taxPayments = [
        { month: 'Jan', vat: 180000, income: 0, withholding: 45000, property: 0 },
        { month: 'Feb', vat: 195000, income: 0, withholding: 52000, property: 0 },
        { month: 'Mar', vat: 210000, income: 0, withholding: 75000, property: 0 },
        { month: 'Apr', vat: 285000, income: 0, withholding: 0, property: 160000 },
        { month: 'May', vat: 0, income: 0, withholding: 65000, property: 0 },
        { month: 'Jun', vat: 0, income: 450000, withholding: 0, property: 160000 }
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'overdue': return 'bg-red-100 text-red-800';
            case 'draft': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
                        <p className="text-gray-600 mt-1">Track your real estate financial performance</p>
                    </div>
                    <div className="flex gap-3">
                        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Select property" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Properties</SelectItem>
                                {properties.map(property => (
                                    <SelectItem key={property.id} value={property.id.toString()}>
                                        {property.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">This Month</SelectItem>
                                <SelectItem value="quarter">This Quarter</SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(financialData.totalIncome)}</div>
                            <div className="flex items-center text-xs text-green-600">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +12.5% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(financialData.netIncome)}</div>
                            <div className="flex items-center text-xs text-green-600">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +8.3% from last month
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                            <Home className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{financialData.occupancyRate}%</div>
                            <Progress value={financialData.occupancyRate} className="mt-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                            <Receipt className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{financialData.collectionRate}%</div>
                            <div className="flex items-center text-xs text-yellow-600">
                                <TrendingDown className="w-3 h-3 mr-1" />
                                -2.1% from last month
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-7">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="rent-collection">Rent Collection</TabsTrigger>
                        <TabsTrigger value="payment-details">Payment Details</TabsTrigger>
                        <TabsTrigger value="expenses">Expenses</TabsTrigger>
                        <TabsTrigger value="tax-documents">Tax Documents</TabsTrigger>
                        <TabsTrigger value="bank-accounts">Bank Accounts</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Income vs Expenses Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Income vs Expenses Trend</CardTitle>
                                    <CardDescription>6-month financial performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={incomeVsExpensesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                                            <Legend />
                                            <Area
                                                type="monotone"
                                                dataKey="income"
                                                stackId="1"
                                                stroke="#22c55e"
                                                fill="#22c55e"
                                                fillOpacity={0.6}
                                                name="Income"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="expenses"
                                                stackId="2"
                                                stroke="#ef4444"
                                                fill="#ef4444"
                                                fillOpacity={0.6}
                                                name="Expenses"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Property Performance */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Property Performance</CardTitle>
                                    <CardDescription>Income by property</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {properties.map((property) => (
                                            <div key={property.id} className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium">{property.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {property.occupied}/{property.units} units occupied
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold">{formatCurrency(property.income)}</div>
                                                    <div className="text-sm text-green-600">
                                                        {Math.round((property.occupied / property.units) * 100)}% occupied
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Payment Details Tab */}
                    <TabsContent value="payment-details" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Payment Details</h3>
                                <p className="text-gray-600">Track individual payments by tenant, unit, and property</p>
                            </div>
                            <div className="flex gap-3">
                                <Select defaultValue="current-month">
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="current-month">This Month</SelectItem>
                                        <SelectItem value="last-month">Last Month</SelectItem>
                                        <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                                        <SelectItem value="all-time">All Time</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select defaultValue="all-status">
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all-status">All Status</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="overdue">Overdue</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>

                        {/* Payment Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">
                                        {formatCurrency(2400000)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        47 units paid this month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {formatCurrency(450000)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        7 units pending payment
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-red-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">
                                        {formatCurrency(125000)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        2 units overdue
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                                    <Receipt className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">84%</div>
                                    <p className="text-xs text-muted-foreground">
                                        47 of 56 units paid
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Payment Details by Property */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {[
                                { name: 'Kilimani Heights', total: 1200000, paid: 1050000, pending: 100000, overdue: 50000, units: 24, paidUnits: 20 },
                                { name: 'Westlands Plaza', total: 950000, paid: 800000, pending: 150000, overdue: 0, units: 18, paidUnits: 15 },
                                { name: 'Karen Gardens', total: 700000, paid: 550000, pending: 200000, overdue: 75000, units: 12, paidUnits: 12 }
                            ].map((property, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{property.name}</CardTitle>
                                        <CardDescription>{property.paidUnits} of {property.units} units paid</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-green-600">Paid</span>
                                            <span className="font-semibold text-green-600">{formatCurrency(property.paid)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-yellow-600">Pending</span>
                                            <span className="font-semibold text-yellow-600">{formatCurrency(property.pending)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-red-600">Overdue</span>
                                            <span className="font-semibold text-red-600">{formatCurrency(property.overdue)}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">Collection Rate</span>
                                                <span className="font-bold">{Math.round((property.paid / property.total) * 100)}%</span>
                                            </div>
                                            <Progress
                                                value={(property.paid / property.total) * 100}
                                                className="mt-2"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Detailed Payment Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Details by Unit</CardTitle>
                            <CardDescription>Complete payment status for all units this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-neutral-300">
                                            <th className="text-left p-3 font-medium">Property</th>
                                            <th className="text-left p-3 font-medium">Unit</th>
                                            <th className="text-left p-3 font-medium">Tenant</th>
                                            <th className="text-left p-3 font-medium">Amount</th>
                                            <th className="text-left p-3 font-medium">Status</th>
                                            <th className="text-left p-3 font-medium">Payment Date</th>
                                            <th className="text-left p-3 font-medium">Due Date</th>
                                            <th className="text-left p-3 font-medium">Days Overdue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { property: 'Kilimani Heights', unit: 'A101', tenant: 'John Mwangi', amount: 50000, status: 'paid', paymentDate: '2024-09-02', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Kilimani Heights', unit: 'A102', tenant: 'Sarah Wanjiku', amount: 50000, status: 'paid', paymentDate: '2024-09-01', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Kilimani Heights', unit: 'A103', tenant: 'Peter Kamau', amount: 50000, status: 'pending', paymentDate: null, dueDate: '2024-09-01', daysOverdue: 16 },
                                            { property: 'Kilimani Heights', unit: 'A104', tenant: 'Mary Njeri', amount: 50000, status: 'overdue', paymentDate: null, dueDate: '2024-09-01', daysOverdue: 16 },
                                            { property: 'Westlands Plaza', unit: 'B201', tenant: 'James Ochieng', amount: 65000, status: 'paid', paymentDate: '2024-09-03', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Westlands Plaza', unit: 'B202', tenant: 'Grace Akinyi', amount: 65000, status: 'paid', paymentDate: '2024-08-31', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Westlands Plaza', unit: 'B203', tenant: 'David Kipchoge', amount: 65000, status: 'pending', paymentDate: null, dueDate: '2024-09-01', daysOverdue: 16 },
                                            { property: 'Karen Gardens', unit: 'C301', tenant: 'Susan Mutua', amount: 80000, status: 'paid', paymentDate: '2024-09-01', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Karen Gardens', unit: 'C302', tenant: 'Robert Kimani', amount: 80000, status: 'paid', paymentDate: '2024-09-02', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Karen Gardens', unit: 'C303', tenant: 'Ann Wambui', amount: 80000, status: 'pending', paymentDate: null, dueDate: '2024-09-01', daysOverdue: 16 },
                                            { property: 'Kilimani Heights', unit: 'A105', tenant: 'Joseph Otieno', amount: 50000, status: 'paid', paymentDate: '2024-09-05', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Kilimani Heights', unit: 'A106', tenant: 'Lucy Chebet', amount: 50000, status: 'paid', paymentDate: '2024-09-01', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Westlands Plaza', unit: 'B204', tenant: 'Michael Wekesa', amount: 65000, status: 'paid', paymentDate: '2024-09-04', dueDate: '2024-09-01', daysOverdue: 0 },
                                            { property: 'Karen Gardens', unit: 'C304', tenant: 'Jennifer Maina', amount: 80000, status: 'overdue', paymentDate: null, dueDate: '2024-09-01', daysOverdue: 16 },
                                            { property: 'Kilimani Heights', unit: 'A107', tenant: 'Francis Ndung\'u', amount: 50000, status: 'paid', paymentDate: '2024-09-03', dueDate: '2024-09-01', daysOverdue: 0 }
                                        ].map((payment, index) => (
                                            <tr key={index} className="border-b border-neutral-300 hover:bg-gray-50">
                                                <td className="p-3 text-sm">{payment.property}</td>
                                                <td className="p-3 text-sm font-medium">{payment.unit}</td>
                                                <td className="p-3 text-sm">{payment.tenant}</td>
                                                <td className="p-3 text-sm font-semibold">{formatCurrency(payment.amount)}</td>
                                                <td className="p-3">
                                                    <Badge
                                                        className={
                                                            payment.status === 'paid'
                                                                ? 'bg-green-100 text-green-800'
                                                                : payment.status === 'pending'
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-red-100 text-red-800'
                                                        }
                                                    >
                                                        {payment.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-3 text-sm">
                                                    {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="p-3 text-sm">
                                                    {new Date(payment.dueDate).toLocaleDateString()}
                                                </td>
                                                <td className="p-3 text-sm">
                                                    {payment.status !== 'paid' && payment.daysOverdue > 0 ? (
                                                        <span className="text-red-600 font-medium">{payment.daysOverdue} days</span>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Last Month's Outstanding */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Previous Month Outstanding</CardTitle>
                            <CardDescription>Units that didn't pay last month and their current status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { property: 'Kilimani Heights', unit: 'A108', tenant: 'Daniel Muli', lastMonthAmount: 50000, currentStatus: 'paid', paidDate: '2024-09-10', totalOverdue: 50000 },
                                    { property: 'Westlands Plaza', unit: 'B205', tenant: 'Alice Wanjiru', lastMonthAmount: 65000, currentStatus: 'pending', paidDate: null, totalOverdue: 130000 },
                                    { property: 'Karen Gardens', unit: 'C305', tenant: 'Kevin Omondi', lastMonthAmount: 80000, currentStatus: 'overdue', paidDate: null, totalOverdue: 160000 }
                                ].map((outstanding, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{outstanding.tenant}</div>
                                                <div className="text-sm text-gray-600">{outstanding.property} - {outstanding.unit}</div>
                                                <div className="text-xs text-red-600">Last month: {formatCurrency(outstanding.lastMonthAmount)}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-red-600">{formatCurrency(outstanding.totalOverdue)}</div>
                                            <Badge
                                                className={
                                                    outstanding.currentStatus === 'paid'
                                                        ? 'bg-green-100 text-green-800'
                                                        : outstanding.currentStatus === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                }
                                            >
                                                {outstanding.currentStatus}
                                            </Badge>
                                            {outstanding.paidDate && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Paid: {new Date(outstanding.paidDate).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rent Collection Tab */}
                    <TabsContent value="rent-collection" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Collected
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">
                                        {formatCurrency(rentCollection.collected)}
                                    </div>
                                    <Progress value={80} className="mt-2" />
                                    <p className="text-sm text-gray-600 mt-2">80% of expected rent</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-yellow-600" />
                                        Pending
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {formatCurrency(rentCollection.pending)}
                                    </div>
                                    <Progress value={15} className="mt-2" />
                                    <p className="text-sm text-gray-600 mt-2">15% pending payment</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                        Overdue
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">
                                        {formatCurrency(rentCollection.overdue)}
                                    </div>
                                    <Progress value={5} className="mt-2" />
                                    <p className="text-sm text-gray-600 mt-2">5% overdue payments</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Rent Collection Trend Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Rent Collection Trend</CardTitle>
                                <CardDescription>Monthly collection performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={400}>
                                    <ComposedChart data={rentCollectionTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                                        <Tooltip formatter={(value, name) => [
                                            name === 'rate' ? `${value}%` : formatCurrency(Number(value)),
                                            name === 'rate' ? 'Collection Rate' : name
                                        ]} />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="collected" fill="#22c55e" name="Collected" />
                                        <Bar yAxisId="left" dataKey="pending" fill="#eab308" name="Pending" />
                                        <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} name="Collection Rate %" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Expenses Tab */}
                    <TabsContent value="expenses" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Expense Breakdown */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Expense Breakdown</CardTitle>
                                    <CardDescription>Monthly expenses by category</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {expenses.map((expense, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm font-medium">{expense.category}</span>
                                                        <span className="text-sm text-gray-600">{expense.percentage}%</span>
                                                    </div>
                                                    <Progress value={expense.percentage} className="h-2" />
                                                </div>
                                                <div className="ml-4 text-right">
                                                    <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expense Distribution Pie Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Expense Distribution</CardTitle>
                                    <CardDescription>Visual breakdown of expenses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={expenseDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {expenseDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Tax Documents Tab */}
                    <TabsContent value="tax-documents" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Tax Documents Management</h3>
                                <p className="text-gray-600">Manage and track all tax-related documents</p>
                            </div>
                            <Button className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Document
                            </Button>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Tax Documents</CardTitle>
                                <CardDescription>Track compliance and payment status</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {taxDocuments.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-gray-400" />
                                                <div>
                                                    <div className="font-medium">{doc.type}</div>
                                                    <div className="text-sm text-gray-600">{doc.description}</div>
                                                    <div className="text-xs text-gray-500">{doc.period}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="font-semibold">{formatCurrency(doc.amount)}</div>
                                                    <div className="text-sm text-gray-600">
                                                        Due: {new Date(doc.dueDate).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <Badge className={getStatusColor(doc.status)}>
                                                    {doc.status}
                                                </Badge>
                                                <div className="flex gap-1">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tax Payments Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tax Payments Overview</CardTitle>
                                <CardDescription>Monthly tax payments by type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={taxPayments}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                                        <Legend />
                                        <Bar dataKey="vat" stackId="a" fill="#8884d8" name="VAT" />
                                        <Bar dataKey="income" stackId="a" fill="#82ca9d" name="Income Tax" />
                                        <Bar dataKey="withholding" stackId="a" fill="#ffc658" name="Withholding Tax" />
                                        <Bar dataKey="property" stackId="a" fill="#ff7300" name="Property Tax" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Bank Accounts Tab */}
                    <TabsContent value="bank-accounts" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Bank Accounts</h3>
                                <p className="text-gray-600">Manage your business bank accounts</p>
                            </div>
                            <Button className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Account
                            </Button>
                        </div>

                        {/* Account Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {formatCurrency(bankAccounts.reduce((sum, account) => sum + account.balance, 0))}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Across {bankAccounts.length} accounts</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {bankAccounts.filter(acc => acc.status === 'active').length}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Ready for transactions</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Primary Account</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {formatCurrency(bankAccounts.find(acc => acc.isPrimary)?.balance || 0)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {bankAccounts.find(acc => acc.isPrimary)?.bankName}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Fixed Deposits</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {formatCurrency(bankAccounts
                                            .filter(acc => acc.accountType === 'Fixed Deposit')
                                            .reduce((sum, acc) => sum + acc.balance, 0)
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Locked investments</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Bank Accounts List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Details</CardTitle>
                                <CardDescription>Manage and monitor your bank accounts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {bankAccounts.map((account) => (
                                        <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <CreditCard className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{account.bankName}</span>
                                                        {account.isPrimary && (
                                                            <Badge variant="secondary" className="text-xs">Primary</Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {account.accountNumber} • {account.accountType}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Last transaction: {new Date(account.lastTransaction).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="text-lg font-bold">{formatCurrency(account.balance)}</div>
                                                    <Badge
                                                        className={
                                                            account.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : account.status === 'locked'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                        }
                                                    >
                                                        {account.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    {!account.isPrimary && (
                                                        <Button variant="outline" size="sm">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Income vs Expenses Line Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Financial Performance</CardTitle>
                                    <CardDescription>Income, expenses and net profit trend</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <LineChart data={incomeVsExpensesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                                            <Legend />
                                            <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} name="Income" />
                                            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
                                            <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={3} name="Net Profit" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Monthly Expense Comparison */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Monthly Expense Trends</CardTitle>
                                    <CardDescription>Track expense categories over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={incomeVsExpensesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                                            <Legend />
                                            <Bar dataKey="expenses" fill="#ef4444" name="Total Expenses" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Cash Flow Analysis */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Cash Flow Analysis</CardTitle>
                                <CardDescription>Monthly cash inflows and outflows</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={500}>
                                    <ComposedChart data={incomeVsExpensesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="income"
                                            fill="#22c55e"
                                            fillOpacity={0.8}
                                            name="Income"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="expenses"
                                            fill="#ef4444"
                                            fillOpacity={0.8}
                                            name="Expenses"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="net"
                                            stroke="#3b82f6"
                                            strokeWidth={4}
                                            name="Net Cash Flow"
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Financial Ratios */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Expense Ratio</CardTitle>
                                    <CardDescription>Expenses as % of income</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-center">
                                        {Math.round((financialData.totalExpenses / financialData.totalIncome) * 100)}%
                                    </div>
                                    <Progress
                                        value={(financialData.totalExpenses / financialData.totalIncome) * 100}
                                        className="mt-4"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                        Target: &lt;40%
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Profit Margin</CardTitle>
                                    <CardDescription>Net profit as % of income</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-center text-green-600">
                                        {Math.round((financialData.netIncome / financialData.totalIncome) * 100)}%
                                    </div>
                                    <Progress
                                        value={(financialData.netIncome / financialData.totalIncome) * 100}
                                        className="mt-4"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                        Industry avg: 60%
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Collection Efficiency</CardTitle>
                                    <CardDescription>Payment collection rate</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-center text-blue-600">
                                        {financialData.collectionRate}%
                                    </div>
                                    <Progress
                                        value={financialData.collectionRate}
                                        className="mt-4"
                                    />
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                        Target: &gt;95%
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default FinancialOverview;

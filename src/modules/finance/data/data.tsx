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

const paymentsSample = [
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
]

export { financialData, rentCollection, properties, expenses, taxDocuments, bankAccounts, incomeVsExpensesData, expenseDistribution, rentCollectionTrend, taxPayments, paymentsSample }
interface Property {
    id: string;
    name: string;
    address: string;
    type: 'apartment' | 'house' | 'commercial';
    units: number;
    occupiedUnits: number;
    monthlyRevenue: number;
    totalRevenue: number;
    occupancyRate: number;
    status: 'active' | 'maintenance' | 'vacant';
    image: string;
    lastUpdated: string;
}

interface Tenant {
    id: string;
    name: string;
    email: string;
    phone: string;
    unit: string;
    property: string;
    rentAmount: number;
    leaseStart: string;
    leaseEnd: string;
    status: 'active' | 'pending' | 'overdue' | 'expired';
    avatar: string;
}

interface Transaction {
    id: string;
    type: 'rent' | 'deposit' | 'maintenance' | 'utility';
    amount: number;
    tenant: string;
    property: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    description: string;
}

interface DashboardStats {
    totalProperties: number;
    totalUnits: number;
    occupiedUnits: number;
    monthlyRevenue: number;
    totalRevenue: number;
    avgOccupancyRate: number;
    pendingMaintenance: number;
    overduePayments: number;
}

export type { Property, Tenant, Transaction, DashboardStats }
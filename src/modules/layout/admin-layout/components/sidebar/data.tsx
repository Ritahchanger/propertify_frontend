import { Plus, Wrench, Users, DollarSign } from "lucide-react";

const quickActions = [
  { id: 'add-property', label: 'Add Property', icon: Plus, href: '/properties/add', color: 'bg-blue-500' },
  { id: 'add-tenant', label: 'Add Tenant', icon: Users, href: '/tenants/add', color: 'bg-green-500' },
  { id: 'create-work-order', label: 'Work Order', icon: Wrench, href: '/maintenance/create', color: 'bg-orange-500' },
  { id: 'collect-rent', label: 'Collect Rent', icon: DollarSign, href: '/financial/collect', color: 'bg-purple-500' }
];

// User portfolio stats
const portfolioStats = {
  totalProperties: 12,
  totalUnits: 48,
  occupancyRate: 94.2,
  monthlyRevenue: 24500,
  maintenanceRequests: 4,
  pendingApplications: 2
};

export { quickActions, portfolioStats }
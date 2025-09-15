import { Card, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { UserCheck, UserX, Clock, Users, RefreshCw, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Define types for better TypeScript support
interface Tenant {
  id: string;
  status: 'active' | 'inactive' | 'suspended';
  // other properties...
}

interface Application {
  applicationStatus: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  // other properties...
}

interface HeaderProps {
  tenants: Tenant[];
  pendingApplications: Application[];
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: string) => void;
  setEstateFilter: (filter: string) => void;
}

const Header = ({ tenants, pendingApplications, setSearchTerm, setStatusFilter, setEstateFilter }: HeaderProps) => {
  // Prepare data for tenant status pie chart
  const tenantStatusData = [
    { name: 'Active', value: tenants.filter(t => t.status === 'active').length, color: '#10b981' },
    { name: 'Suspended', value: tenants.filter(t => t.status === 'suspended').length, color: '#ef4444' },
    { name: 'Inactive', value: tenants.filter(t => t.status === 'inactive').length, color: '#6b7280' },
  ];

  // Prepare data for application status bar chart
  const applicationStatusData = [
    { status: 'Pending', count: pendingApplications.length, color: '#f59e0b' },
    { status: 'Approved', count: tenants.filter(t => t.status === 'active').length, color: '#10b981' },
    { status: 'Rejected', count: 0, color: '#ef4444' }, // You might want to track rejected applications
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600 mt-1">Manage tenants and applications</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setEstateFilter('all');
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards with Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Tenants Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold text-blue-600">{tenants.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-3 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ count: tenants.length }]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Tenants Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Tenants</p>
                <p className="text-2xl font-bold text-green-600">
                  {tenants.filter(t => t.status === 'active').length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-3 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tenantStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={15}
                    outerRadius={25}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tenantStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Suspended Tenants Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {tenants.filter(t => t.status === 'suspended').length}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-500" />
            </div>
            <div className="mt-3 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationStatusData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pending Applications Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingApplications.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-3 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ count: pendingApplications.length }]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mini Dashboard Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Tenant Status Distribution */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Tenant Status Distribution</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tenantStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {tenantStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Application Status Overview */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Application Status Overview</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationStatusData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis dataKey="status" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Header;
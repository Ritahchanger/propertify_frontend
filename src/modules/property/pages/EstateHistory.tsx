import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Badge } from "@/lib/components/ui/badge";
import Layout from "@/modules/layout/admin-layout/Layout";
import {
  Home,
  Users,
  DollarSign,
  Calendar,
  Download,
  ArrowLeft,
  TrendingUp,
  FileText,
  BarChart3,
} from "lucide-react";

// Static data interfaces
interface EstateHistory {
  id: string;
  name: string;
  location: string;
  description: string;
  totalUnits: number;
  status: string;
  createdAt: string;
  units: UnitHistory[];
  financialSummary: FinancialSummary;
  tenantHistory: TenantHistory[];
  paymentHistory: PaymentRecord[];
}

interface UnitHistory {
  id: string;
  unitNumber: string;
  status: string;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  currentTenant: TenantInfo | null;
  rentalHistory: RentalPeriod[];
}

interface TenantInfo {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  moveInDate: string;
  leaseEndDate: string;
}

interface RentalPeriod {
  tenantName: string;
  moveInDate: string;
  moveOutDate: string | null;
  duration: string;
  totalPaid: number;
}

interface FinancialSummary {
  totalRevenue: number;
  averageMonthlyRevenue: number;
  occupancyRate: number;
  pendingPayments: number;
}

interface PaymentRecord {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  unitNumber: string;
  tenantName: string;
  status: string;
}

interface TenantHistory {
  id: string;
  firstName: string;
  lastName: string;
  unitNumber: string;
  moveInDate: string;
  moveOutDate: string | null;
  totalPaid: number;
  paymentConsistency: number;
  status: string;
}

// Static data generator
const generateStaticEstateHistory = (estateId: string): EstateHistory => {
  const baseData = {
    id: estateId,
    name: "Sunset Villas",
    location: "Westlands, Nairobi",
    description:
      "Luxury apartment complex with modern amenities and 24/7 security",
    totalUnits: 12,
    status: "active",
    createdAt: "2023-01-15T00:00:00.000Z",
  };

  const units: UnitHistory[] = [
    {
      id: "unit-1",
      unitNumber: "A101",
      status: "occupied",
      monthlyRent: 25000,
      bedrooms: 2,
      bathrooms: 2,
      currentTenant: {
        id: "tenant-1",
        firstName: "John",
        lastName: "Mwangi",
        phone: "+254712345678",
        email: "john.mwangi@email.com",
        moveInDate: "2023-03-01",
        leaseEndDate: "2024-08-31",
      },
      rentalHistory: [
        {
          tenantName: "Sarah Kimani",
          moveInDate: "2022-06-01",
          moveOutDate: "2023-02-28",
          duration: "9 months",
          totalPaid: 225000,
        },
      ],
    },
    {
      id: "unit-2",
      unitNumber: "A102",
      status: "occupied",
      monthlyRent: 30000,
      bedrooms: 3,
      bathrooms: 2,
      currentTenant: {
        id: "tenant-2",
        firstName: "Grace",
        lastName: "Omondi",
        phone: "+254723456789",
        email: "grace.omondi@email.com",
        moveInDate: "2023-05-15",
        leaseEndDate: "2024-05-14",
      },
      rentalHistory: [],
    },
    {
      id: "unit-3",
      unitNumber: "A103",
      status: "vacant",
      monthlyRent: 18000,
      bedrooms: 1,
      bathrooms: 1,
      currentTenant: null,
      rentalHistory: [
        {
          tenantName: "David Otieno",
          moveInDate: "2022-09-01",
          moveOutDate: "2023-11-30",
          duration: "15 months",
          totalPaid: 270000,
        },
      ],
    },
    {
      id: "unit-4",
      unitNumber: "B201",
      status: "maintenance",
      monthlyRent: 22000,
      bedrooms: 2,
      bathrooms: 1,
      currentTenant: null,
      rentalHistory: [
        {
          tenantName: "Mary Wanjiku",
          moveInDate: "2023-01-01",
          moveOutDate: "2023-10-31",
          duration: "10 months",
          totalPaid: 220000,
        },
      ],
    },
  ];

  const paymentHistory: PaymentRecord[] = [
    {
      id: "pay-1",
      amount: 25000,
      paymentDate: "2024-01-05",
      paymentMethod: "mpesa",
      unitNumber: "A101",
      tenantName: "John Mwangi",
      status: "completed",
    },
    {
      id: "pay-2",
      amount: 30000,
      paymentDate: "2024-01-03",
      paymentMethod: "bank",
      unitNumber: "A102",
      tenantName: "Grace Omondi",
      status: "completed",
    },
    {
      id: "pay-3",
      amount: 25000,
      paymentDate: "2023-12-28",
      paymentMethod: "mpesa",
      unitNumber: "A101",
      tenantName: "John Mwangi",
      status: "completed",
    },
    {
      id: "pay-4",
      amount: 18000,
      paymentDate: "2023-12-25",
      paymentMethod: "cash",
      unitNumber: "A103",
      tenantName: "David Otieno",
      status: "completed",
    },
  ];

  const tenantHistory: TenantHistory[] = [
    {
      id: "tenant-1",
      firstName: "John",
      lastName: "Mwangi",
      unitNumber: "A101",
      moveInDate: "2023-03-01",
      moveOutDate: null,
      totalPaid: 275000,
      paymentConsistency: 100,
      status: "active",
    },
    {
      id: "tenant-2",
      firstName: "Grace",
      lastName: "Omondi",
      unitNumber: "A102",
      moveInDate: "2023-05-15",
      moveOutDate: null,
      totalPaid: 210000,
      paymentConsistency: 95,
      status: "active",
    },
    {
      id: "tenant-3",
      firstName: "David",
      lastName: "Otieno",
      unitNumber: "A103",
      moveInDate: "2022-09-01",
      moveOutDate: "2023-11-30",
      totalPaid: 270000,
      paymentConsistency: 92,
      status: "inactive",
    },
    {
      id: "tenant-4",
      firstName: "Mary",
      lastName: "Wanjiku",
      unitNumber: "B201",
      moveInDate: "2023-01-01",
      moveOutDate: "2023-10-31",
      totalPaid: 220000,
      paymentConsistency: 88,
      status: "inactive",
    },
  ];

  const financialSummary: FinancialSummary = {
    totalRevenue: 975000,
    averageMonthlyRevenue: 75000,
    occupancyRate: 67,
    pendingPayments: 2,
  };

  return {
    ...baseData,
    units,
    financialSummary,
    tenantHistory,
    paymentHistory,
  };
};

// Static service functions
const EstateService = {
  getEstateHistory: async (estateId: string): Promise<EstateHistory> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateStaticEstateHistory(estateId);
  },

  downloadEstateReport: async (estateId: string) => {
    const history = await EstateService.getEstateHistory(estateId);

    // Create CSV content
    const csvContent = generateCSVReport(history);

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${history.name.replace(/\s+/g, "_")}_Report_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

const generateCSVReport = (history: EstateHistory) => {
  const headers = [
    "Estate Name",
    "Location",
    "Total Units",
    "Total Revenue",
    "Occupancy Rate",
    "Created Date",
    "Status",
  ];

  const estateData = [
    history.name,
    history.location,
    history.totalUnits,
    history.financialSummary.totalRevenue,
    `${history.financialSummary.occupancyRate}%`,
    new Date(history.createdAt).toLocaleDateString(),
    history.status,
  ];

  let csv = headers.join(",") + "\n";
  csv += estateData.map((field) => `"${field}"`).join(",") + "\n\n";

  // Add units section
  csv += "UNITS\n";
  csv += "Unit Number,Status,Monthly Rent,Bedrooms,Bathrooms,Current Tenant\n";
  history.units.forEach((unit) => {
    csv +=
      [
        unit.unitNumber,
        unit.status,
        unit.monthlyRent,
        unit.bedrooms,
        unit.bathrooms,
        unit.currentTenant
          ? `${unit.currentTenant.firstName} ${unit.currentTenant.lastName}`
          : "Vacant",
      ]
        .map((field) => `"${field}"`)
        .join(",") + "\n";
  });

  // Add payments section
  csv += "\nRECENT PAYMENTS\n";
  csv += "Date,Amount,Method,Unit,Tenant,Status\n";
  history.paymentHistory.forEach((payment) => {
    csv +=
      [
        new Date(payment.paymentDate).toLocaleDateString(),
        payment.amount,
        payment.paymentMethod,
        payment.unitNumber,
        payment.tenantName,
        payment.status,
      ]
        .map((field) => `"${field}"`)
        .join(",") + "\n";
  });

  return csv;
};

const EstateHistoryPage = () => {
  const { estateId } = useParams<{ estateId: string }>();
  const navigate = useNavigate();
  const [estateHistory, setEstateHistory] = useState<EstateHistory | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchEstateHistory();
  }, [estateId]);

  const fetchEstateHistory = async () => {
    try {
      setLoading(true);
      const history = await EstateService.getEstateHistory(estateId!);
      setEstateHistory(history);
    } catch (error) {
      console.error("Error fetching estate history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      setDownloading(true);
      await EstateService.downloadEstateReport(estateId!);
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      setDownloading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: {
      [key: string]: {
        variant: "default" | "secondary" | "destructive" | "outline";
        label: string;
      };
    } = {
      active: { variant: "default", label: "Active" },
      inactive: { variant: "secondary", label: "Inactive" },
      maintenance: { variant: "destructive", label: "Maintenance" },
      occupied: { variant: "default", label: "Occupied" },
      vacant: { variant: "outline", label: "Vacant" },
      completed: { variant: "default", label: "Completed" },
      pending: { variant: "secondary", label: "Pending" },
    };

    const config = statusConfig[status] || {
      variant: "outline",
      label: status,
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading estate history...</div>
        </div>
      </div>
    );
  }

  if (!estateHistory) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Estate history not found</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="py-6 space-y-6  mx-[1rem]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{estateHistory.name}</h1>
              <p className="text-gray-600">{estateHistory.location}</p>
            </div>
          </div>
          <Button
            onClick={handleDownloadReport}
            disabled={downloading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            {downloading ? "Downloading..." : "Download Report"}
          </Button>
        </div>

        {/* Estate Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Estate Overview</span>
            </CardTitle>
            <CardDescription>
              Created on {formatDate(estateHistory.createdAt)} •{" "}
              {estateHistory.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-neutral-300 rounded-lg">
                <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold">
                  {estateHistory.totalUnits}
                </div>
                <div className="text-gray-600">Total Units</div>
              </div>
              <div className="text-center p-4 border border-neutral-300 rounded-lg">
                <DollarSign className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold">
                  {formatCurrency(estateHistory.financialSummary.totalRevenue)}
                </div>
                <div className="text-gray-600">Total Revenue</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-2xl font-bold">
                  {estateHistory.financialSummary.occupancyRate}%
                </div>
                <div className="text-gray-600">Occupancy Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold">
                  {formatCurrency(
                    estateHistory.financialSummary.averageMonthlyRevenue
                  )}
                </div>
                <div className="text-gray-600">Avg Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Units History */}
          <Card>
            <CardHeader>
              <CardTitle>Units History</CardTitle>
              <CardDescription>
                Current status and rental history of all units
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estateHistory.units.map((unit) => (
                  <div key={unit.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Home className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold">
                          Unit {unit.unitNumber}
                        </span>
                      </div>
                      {getStatusBadge(unit.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Rent:</span>
                        <div className="font-medium">
                          {formatCurrency(unit.monthlyRent)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Bed/Bath:</span>
                        <div className="font-medium">
                          {unit.bedrooms} / {unit.bathrooms}
                        </div>
                      </div>
                    </div>

                    {unit.currentTenant && (
                      <div className="border-t pt-3">
                        <div className="text-sm text-gray-600 mb-1">
                          Current Tenant
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {unit.currentTenant.firstName}{" "}
                            {unit.currentTenant.lastName}
                          </span>
                          <span className="text-xs text-gray-500">
                            Since {formatDate(unit.currentTenant.moveInDate)}
                          </span>
                        </div>
                      </div>
                    )}

                    {unit.rentalHistory.length > 0 && (
                      <div className="border-t pt-3">
                        <div className="text-sm text-gray-600 mb-2">
                          Rental History
                        </div>
                        <div className="space-y-2">
                          {unit.rentalHistory
                            .slice(0, 2)
                            .map((rental, index) => (
                              <div
                                key={index}
                                className="text-xs flex justify-between"
                              >
                                <span>{rental.tenantName}</span>
                                <span className="text-gray-500">
                                  {rental.duration}
                                </span>
                              </div>
                            ))}
                          {unit.rentalHistory.length > 2 && (
                            <div className="text-xs text-blue-600">
                              +{unit.rentalHistory.length - 2} more tenants
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tenant History */}
          <Card>
            <CardHeader>
              <CardTitle>Tenant History</CardTitle>
              <CardDescription>Current and previous tenants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estateHistory.tenantHistory.map((tenant) => (
                  <div key={tenant.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">
                        {tenant.firstName} {tenant.lastName}
                      </div>
                      {getStatusBadge(tenant.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                      <div>
                        <span className="text-gray-600">Unit:</span>
                        <div className="font-medium">{tenant.unitNumber}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Move In:</span>
                        <div className="font-medium">
                          {formatDate(tenant.moveInDate)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Paid:</span>
                        <div className="font-medium">
                          {formatCurrency(tenant.totalPaid)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Consistency:</span>
                        <div className="font-medium">
                          {tenant.paymentConsistency}%
                        </div>
                      </div>
                    </div>

                    {tenant.moveOutDate && (
                      <div className="border-t mt-3 pt-2">
                        <div className="text-xs text-gray-500">
                          Moved out: {formatDate(tenant.moveOutDate)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payment History</CardTitle>
            <CardDescription>Last 10 payments across all units</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {estateHistory.paymentHistory.slice(0, 10).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {payment.tenantName} • Unit {payment.unitNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(payment.paymentDate)} •{" "}
                        {payment.paymentMethod}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {formatCurrency(payment.amount)}
                    </div>
                    {getStatusBadge(payment.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EstateHistoryPage;

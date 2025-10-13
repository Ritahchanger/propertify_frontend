// src/modules/unit/pages/UnitDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  Clock,
  FileText,
  Home,
  Phone,
  Mail,
  MapPin,
  Building2,
  CheckCircle,
  AlertCircle,
  Clock as ClockIcon,
  Download,
  Edit,
  MoreVertical,
} from "lucide-react";
import Layout from "@/modules/layout/admin-layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Badge } from "@/lib/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";

// Mock data - replace with actual API calls
interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  emergencyContact: string;
  avatar?: string;
  occupation: string;
  dateOfBirth: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  method: "mpesa" | "bank" | "cash";
  reference: string;
  dueDate: string;
  paidDate?: string;
  period: string; // e.g., "January 2024"
}

interface MaintenanceRequest {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  cost?: number;
}

interface LeaseHistory {
  id: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: "active" | "ended" | "terminated";
  tenant: Tenant;
  deposit: number;
  depositStatus: "held" | "returned" | "partially-returned";
}

interface UnitDetails {
  id: string;
  unitNumber: string;
  status: "occupied" | "vacant" | "maintenance";
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  amenities: string[];
  currentTenant?: Tenant;
  leaseStartDate?: string;
  leaseEndDate?: string;
  property: {
    id: string;
    name: string;
    location: string;
  };
}

const UnitDetails: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const [unit, setUnit] = useState<UnitDetails | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [leaseHistory, setLeaseHistory] = useState<LeaseHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchUnitData = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API calls
        const unitData: UnitDetails = {
          id: unitId || "1",
          unitNumber: "A-101",
          status: "occupied",
          monthlyRent: 25000,
          bedrooms: 2,
          bathrooms: 1,
          squareFeet: 850,
          amenities: ["Parking", "Balcony", "Security", "Water Backup"],
          currentTenant: {
            id: "tenant-1",
            firstName: "John",
            lastName: "Kamau",
            email: "john.kamau@email.com",
            phone: "+254712345678",
            idNumber: "12345678",
            emergencyContact: "+254798765432",
            occupation: "Software Engineer",
            dateOfBirth: "1990-05-15",
          },
          leaseStartDate: "2024-01-01",
          leaseEndDate: "2024-12-31",
          property: {
            id: "property-1",
            name: "Kilimani Apartments",
            location: "Kilimani, Nairobi",
          },
        };

        const paymentsData: Payment[] = [
          {
            id: "1",
            date: "2024-01-05",
            amount: 25000,
            status: "paid",
            method: "mpesa",
            reference: "MPESA123456",
            dueDate: "2024-01-01",
            paidDate: "2024-01-05",
            period: "January 2024",
          },
          {
            id: "2",
            date: "2024-02-03",
            amount: 25000,
            status: "paid",
            method: "mpesa",
            reference: "MPESA123457",
            dueDate: "2024-02-01",
            paidDate: "2024-02-03",
            period: "February 2024",
          },
          {
            id: "3",
            date: "2024-03-01",
            amount: 25000,
            status: "pending",
            method: "mpesa",
            reference: "",
            dueDate: "2024-03-01",
            period: "March 2024",
          },
        ];

        const maintenanceData: MaintenanceRequest[] = [
          {
            id: "1",
            date: "2024-01-15",
            title: "Leaking Kitchen Faucet",
            description: "Kitchen faucet has been leaking continuously",
            status: "completed",
            priority: "medium",
            cost: 2500,
          },
          {
            id: "2",
            date: "2024-02-20",
            title: "AC Not Cooling",
            description: "Air conditioning unit not cooling properly",
            status: "in-progress",
            priority: "high",
          },
        ];

        const leaseHistoryData: LeaseHistory[] = [
          {
            id: "1",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            monthlyRent: 25000,
            status: "active",
            tenant: unitData.currentTenant!,
            deposit: 50000,
            depositStatus: "held",
          },
          {
            id: "2",
            startDate: "2023-01-01",
            endDate: "2023-12-31",
            monthlyRent: 23000,
            status: "ended",
            tenant: {
              id: "tenant-2",
              firstName: "Mary",
              lastName: "Wanjiku",
              email: "mary.w@email.com",
              phone: "+254723456789",
              idNumber: "87654321",
              emergencyContact: "+254712345678",
              occupation: "Teacher",
              dateOfBirth: "1985-08-20",
            },
            deposit: 46000,
            depositStatus: "returned",
          },
        ];

        setUnit(unitData);
        setPayments(paymentsData);
        setMaintenanceRequests(maintenanceData);
        setLeaseHistory(leaseHistoryData);
      } catch (error) {
        console.error("Error fetching unit data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnitData();
  }, [unitId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <ClockIcon className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "mpesa":
        return "M-Pesa";
      case "bank":
        return "Bank Transfer";
      case "cash":
        return "Cash";
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading unit details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!unit) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center">
            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Unit Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              The unit you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/properties")}>
              Back to Properties
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Unit {unit.unitNumber}
              </h1>
              <p className="text-gray-600">
                {unit.property.name} • {unit.property.location}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Unit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Records
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Unit Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Rent
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    KSh {unit.monthlyRent.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unit Size</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {unit.squareFeet} sq ft
                  </p>
                  <p className="text-xs text-gray-500">
                    {unit.bedrooms} bed • {unit.bathrooms} bath
                  </p>
                </div>
                <Home className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Current Tenant
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {unit.currentTenant ? "Occupied" : "Vacant"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Since{" "}
                    {unit.leaseStartDate
                      ? new Date(unit.leaseStartDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <User className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Payment Status
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {payments.filter((p) => p.status === "paid").length}/
                    {payments.length}
                  </p>
                  <p className="text-xs text-gray-500">payments this year</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="history">Lease History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Tenant Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Current Tenant</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {unit.currentTenant ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={unit.currentTenant.avatar} />
                          <AvatarFallback>
                            {unit.currentTenant.firstName[0]}
                            {unit.currentTenant.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {unit.currentTenant.firstName}{" "}
                            {unit.currentTenant.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {unit.currentTenant.occupation}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900">Contact</p>
                          <p className="text-gray-600">
                            {unit.currentTenant.phone}
                          </p>
                          <p className="text-gray-600">
                            {unit.currentTenant.email}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">ID Number</p>
                          <p className="text-gray-600">
                            {unit.currentTenant.idNumber}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900">
                            Lease Period
                          </p>
                          <p className="text-gray-600">
                            {new Date(
                              unit.leaseStartDate!
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(unit.leaseEndDate!).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Emergency Contact
                          </p>
                          <p className="text-gray-600">
                            {unit.currentTenant.emergencyContact}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No current tenant</p>
                      <Button className="mt-2">Add Tenant</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Unit Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Unit Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Unit Number</p>
                        <p className="text-gray-600">{unit.unitNumber}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Status</p>
                        <Badge
                          className={
                            unit.status === "occupied"
                              ? "bg-green-100 text-green-800"
                              : unit.status === "vacant"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {unit.status.charAt(0).toUpperCase() +
                            unit.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-900 mb-2">
                        Amenities
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {unit.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Bedrooms</p>
                        <p className="text-gray-600">{unit.bedrooms}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bathrooms</p>
                        <p className="text-gray-600">{unit.bathrooms}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        Square Footage
                      </p>
                      <p className="text-gray-600">{unit.squareFeet} sq ft</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Payment History</span>
                </CardTitle>
                <CardDescription>Last 3 payment records</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.slice(0, 3).map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {payment.period}
                        </TableCell>
                        <TableCell>
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {payment.paidDate
                            ? new Date(payment.paidDate).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          KSh {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getPaymentMethodIcon(payment.method)}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment History Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Complete payment records for this unit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Paid Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {payment.period}
                        </TableCell>
                        <TableCell>
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {payment.paidDate
                            ? new Date(payment.paidDate).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          KSh {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getPaymentMethodIcon(payment.method)}
                        </TableCell>
                        <TableCell>{payment.reference || "-"}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>
                  History of maintenance and repair requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          {new Date(request.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {request.title}
                        </TableCell>
                        <TableCell>{request.description}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              request.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : request.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.cost
                            ? `KSh ${request.cost.toLocaleString()}`
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              request.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : request.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lease History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Lease History</CardTitle>
                <CardDescription>
                  Previous and current lease agreements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Lease Period</TableHead>
                      <TableHead>Monthly Rent</TableHead>
                      <TableHead>Deposit</TableHead>
                      <TableHead>Deposit Status</TableHead>
                      <TableHead>Lease Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaseHistory.map((lease) => (
                      <TableRow key={lease.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {lease.tenant.firstName[0]}
                                {lease.tenant.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>
                              {lease.tenant.firstName} {lease.tenant.lastName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(lease.startDate).toLocaleDateString()} -{" "}
                          {new Date(lease.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          KSh {lease.monthlyRent.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          KSh {lease.deposit.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              lease.depositStatus === "held"
                                ? "bg-yellow-100 text-yellow-800"
                                : lease.depositStatus === "returned"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {lease.depositStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              lease.status === "active"
                                ? "bg-green-100 text-green-800"
                                : lease.status === "ended"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {lease.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Lease agreements, contracts, and other documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No documents
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Upload lease agreements, contracts, and other important
                    documents.
                  </p>
                  <Button>Upload Document</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UnitDetails;

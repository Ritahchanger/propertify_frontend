import React, { useState, useMemo } from "react";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MapPin,
  CreditCard,
  Wrench,
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  Filter,
  Search,
  ArrowUpRight,
  Home,
  FileText,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Layout from "@/modules/layout/admin-layout/Layout";

import type { Transaction, DashboardStats, Property } from "../types/types";

import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store/store";

import { openAddPropertyModal } from "@/modules/property/features/AddPropertyModalSlice";

const OwnersDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">(
    "30d"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");

  const dispatch = useDispatch<AppDispatch>();

  // Mock data
  const stats: DashboardStats = useMemo(
    () => ({
      totalProperties: 3,
      totalUnits: 48,
      occupiedUnits: 45,
      monthlyRevenue: 24500,
      totalRevenue: 294000,
      avgOccupancyRate: 93.8,
      pendingMaintenance: 7,
      overduePayments: 2,
    }),
    []
  );

  const properties: Property[] = useMemo(
    () => [
      {
        id: "1",
        name: "Sunset Apartments",
        address: "123 Sunset Blvd, Nairobi",
        type: "apartment",
        units: 20,
        occupiedUnits: 18,
        monthlyRevenue: 12000,
        totalRevenue: 144000,
        occupancyRate: 90,
        status: "active",
        image: "/api/placeholder/400/250",
        lastUpdated: "2024-01-15",
      },
      {
        id: "2",
        name: "Green Valley Homes",
        address: "456 Green Valley Rd, Nairobi",
        type: "house",
        units: 15,
        occupiedUnits: 14,
        monthlyRevenue: 8500,
        totalRevenue: 102000,
        occupancyRate: 93.3,
        status: "active",
        image: "/api/placeholder/400/250",
        lastUpdated: "2024-01-14",
      },
      {
        id: "3",
        name: "Downtown Commercial Plaza",
        address: "789 CBD, Nairobi",
        type: "commercial",
        units: 13,
        occupiedUnits: 13,
        monthlyRevenue: 4000,
        totalRevenue: 48000,
        occupancyRate: 100,
        status: "maintenance",
        image: "/api/placeholder/400/250",
        lastUpdated: "2024-01-13",
      },
    ],
    []
  );

  const recentTransactions: Transaction[] = useMemo(
    () => [
      {
        id: "1",
        type: "rent",
        amount: 1200,
        tenant: "John Doe",
        property: "Sunset Apartments",
        date: "2024-01-15",
        status: "completed",
        description: "Monthly rent payment",
      },
      {
        id: "2",
        type: "maintenance",
        amount: -350,
        tenant: "",
        property: "Green Valley Homes",
        date: "2024-01-14",
        status: "completed",
        description: "Plumbing repair - Unit 5B",
      },
      {
        id: "3",
        type: "deposit",
        amount: 2400,
        tenant: "Sarah Wilson",
        property: "Downtown Commercial Plaza",
        date: "2024-01-13",
        status: "pending",
        description: "Security deposit",
      },
      {
        id: "4",
        type: "rent",
        amount: 950,
        tenant: "Mike Johnson",
        property: "Sunset Apartments",
        date: "2024-01-12",
        status: "failed",
        description: "Monthly rent payment",
      },
    ],
    []
  );

  const revenueData = useMemo(
    () => [
      { month: "Jul", revenue: 22000, expenses: 8500 },
      { month: "Aug", revenue: 23500, expenses: 9200 },
      { month: "Sep", revenue: 21800, expenses: 7800 },
      { month: "Oct", revenue: 24200, expenses: 8900 },
      { month: "Nov", revenue: 25100, expenses: 9500 },
      { month: "Dec", revenue: 24500, expenses: 8700 },
      { month: "Jan", revenue: 24500, expenses: 8300 },
    ],
    []
  );

  const occupancyData = useMemo(
    () => [
      { name: "Occupied", value: stats.occupiedUnits, color: "#10B981" },
      {
        name: "Vacant",
        value: stats.totalUnits - stats.occupiedUnits,
        color: "#F59E0B",
      },
    ],
    [stats]
  );

  const propertyTypeData = useMemo(
    () => [
      { name: "Apartments", value: 20, color: "#3B82F6" },
      { name: "Houses", value: 15, color: "#8B5CF6" },
      { name: "Commercial", value: 13, color: "#F59E0B" },
    ],
    []
  );

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
      vacant: "bg-gray-100 text-gray-800 border-gray-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
      overdue: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getPropertyIcon = (type: string) => {
    const icons = {
      apartment: Building2,
      house: Home,
      commercial: Building2,
    };
    return icons[type as keyof typeof icons] || Building2;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateGrowth = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 mt-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Property Portfolio
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your real estate investments
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <select
                value={timeRange}
                onChange={(e) =>
                  setTimeRange(e.target.value as typeof timeRange)
                }
                className="px-4 py-2 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center"
                onClick={() => {
                  dispatch(openAddPropertyModal());
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </button>
            </div>
          </div>

          {/* Alert for overdue payments */}
          {stats.overduePayments > 0 && (
            <div className="bg-red-50 border border-red-200  p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                <p className="text-red-800">
                  You have {stats.overduePayments} overdue payments requiring
                  attention.
                </p>
              </div>
            </div>
          )}

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Properties Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    Total Properties
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalProperties}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+12%</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Occupancy Rate Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    Occupancy Rate
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.avgOccupancyRate}%
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+2.1%</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Monthly Revenue Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {formatCurrency(stats.monthlyRevenue)}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+8.3%</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Maintenance Issues Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    Maintenance Issues
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.pendingMaintenance}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-600 font-medium">+3</span>
                    <span className="text-gray-500 ml-1">this week</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Revenue & Expenses
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Expenses</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-gray-600" />
                  <YAxis className="text-gray-600" />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name,
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Occupancy Overview */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Unit Occupancy Overview
              </h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value} units`, "Count"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                {occupancyData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Property Portfolio
                </h3>
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {properties.map((property) => {
                const IconComponent = getPropertyIcon(property.type);
                return (
                  <div
                    key={property.id}
                    className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors duration-200">
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {property.name}
                          </h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.address}
                          </div>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg ml-2">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Units Occupied
                          </span>
                          <span className="font-medium">
                            {property.occupiedUnits}/{property.units}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Occupancy Rate
                          </span>
                          <span className="font-medium text-green-600">
                            {property.occupancyRate}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Monthly Revenue
                          </span>
                          <span className="font-medium text-blue-600">
                            {formatCurrency(property.monthlyRevenue)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-6">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center transition-colors duration-200">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          transaction.type === "rent"
                            ? "bg-green-100"
                            : transaction.type === "maintenance"
                            ? "bg-orange-100"
                            : transaction.type === "deposit"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {transaction.type === "rent" && (
                          <DollarSign className="h-5 w-5 text-green-600" />
                        )}
                        {transaction.type === "maintenance" && (
                          <Wrench className="h-5 w-5 text-orange-600" />
                        )}
                        {transaction.type === "deposit" && (
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        )}
                        {transaction.type === "utility" && (
                          <Zap className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{transaction.property}</span>
                          {transaction.tenant && (
                            <span>• {transaction.tenant}</span>
                          )}
                          <span>
                            • {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-lg ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          transaction.status
                        )} mt-1`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Common tasks for property management
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">Add Property</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">New Tenant</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Wrench className="h-5 w-5" />
                  <span className="font-medium">Maintenance</span>
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OwnersDashboard;

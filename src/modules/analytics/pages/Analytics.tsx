import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import Layout from "@/modules/layout/admin-layout/Layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/lib/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { fetchAuthAttempts } from "../features/authAttemptsSlice";
import {
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
  Area
} from 'recharts';
import { ChartBar, Table as TableIcon } from 'lucide-react';

// Types are already inferred from slice, no need to redefine Attempt type

const Analytics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<"all" | "success" | "failed">("all");
  const [timeFilter, setTimeFilter] = useState<"day" | "week" | "month">("week");
  const [viewMode, setViewMode] = useState<"charts" | "table">("charts");

  const { attempts, loading, error } = useSelector(
    (state: RootState) => state.authAttempts
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Fetch attempts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAuthAttempts());
    }
  }, [dispatch, isAuthenticated]);

  const filteredAttempts =
    filter === "all" ? attempts : attempts.filter((a) => a.status === filter);

  const total = attempts.length;
  const success = attempts.filter((a) => a.status === "success").length;
  const failed = attempts.filter((a) => a.status === "failed").length;

  // Prepare data for charts
  const getDailyAttemptsData = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCounts = daysOfWeek.map(day => ({ name: day, success: 0, failed: 0 }));

    attempts.forEach(attempt => {
      const day = new Date(attempt.createdAt).getDay();
      if (attempt.status === 'success') {
        dayCounts[day].success += 1;
      } else {
        dayCounts[day].failed += 1;
      }
    });

    return dayCounts;
  };

  const getHourlyAttemptsData = () => {
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      attempts: 0
    }));

    attempts.forEach(attempt => {
      const hour = new Date(attempt.createdAt).getHours();
      hourlyData[hour].attempts += 1;
    });

    return hourlyData;
  };

  const getMethodData = () => {
    const methods: Record<string, number> = {};

    attempts.forEach(attempt => {
      const method = attempt.attemptType || 'Unknown';
      methods[method] = (methods[method] || 0) + 1;
    });

    return Object.entries(methods).map(([name, value]) => ({ name, value }));
  };

  const getStatusData = () => [
    { name: 'Success', value: success },
    { name: 'Failed', value: failed }
  ];

  const dailyData = getDailyAttemptsData();
  const hourlyData = getHourlyAttemptsData();
  const methodData = getMethodData();
  const statusData = getStatusData();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-md rounded-sm">
            <CardHeader>
              <CardTitle>Total Attempts</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{total}</CardContent>
          </Card>

          <Card className="shadow-md rounded-sm">
            <CardHeader>
              <CardTitle>Successful</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-green-600">
              {success}
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-sm">
            <CardHeader>
              <CardTitle>Failed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-red-600">
              {failed}
            </CardContent>
          </Card>
        </div>

        {/* View Toggle and Filters */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "charts" ? "default" : "outline"}
              onClick={() => setViewMode("charts")}
              className="flex items-center gap-2"
            >
              <ChartBar className="h-4 w-4" />
              Charts View
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              onClick={() => setViewMode("table")}
              className="flex items-center gap-2"
            >
              <TableIcon className="h-4 w-4" />
              Table View
            </Button>
          </div>

          <div className="flex gap-4">
            <Select
              value={timeFilter}
              onValueChange={(v: "day" | "week" | "month") => setTimeFilter(v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filter}
              onValueChange={(v: "all" | "success" | "failed") => setFilter(v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Charts Section - Only show when viewMode is "charts" */}
        {viewMode === "charts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Attempts Chart */}
            <Card className="shadow-lg rounded-sm p-4">
              <CardHeader>
                <CardTitle>Attempts by Day of Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="success" fill="#4CAF50" name="Successful" />
                    <Bar dataKey="failed" fill="#F44336" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Pie Chart */}
            <Card className="shadow-lg rounded-sm p-4">
              <CardHeader>
                <CardTitle>Success vs Failed</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#4CAF50' : '#F44336'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Attempts Chart */}
            <Card className="shadow-lg rounded-sm p-4 md:col-span-2">
              <CardHeader>
                <CardTitle>Attempts by Hour of Day</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="attempts" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Authentication Methods Chart */}
            <Card className="shadow-lg rounded-sm p-4 md:col-span-2">
              <CardHeader>
                <CardTitle>Attempts by Authentication Method</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={methodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Table - Only show when viewMode is "table" */}
        {viewMode === "table" && (
          <Card className="shadow-lg rounded-sm">
            <CardHeader>
              <CardTitle>Login Attempts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <p>Loading attempts...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttempts.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>
                          {a.firstName} {a.lastName}
                        </TableCell>
                        <TableCell>{a.email}</TableCell>
                        <TableCell>{a.ipAddress}</TableCell>
                        <TableCell>{a.attemptType}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              a.status === "success" ? "default" : "destructive"
                            }
                          >
                            {a.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{a.reason}</TableCell>
                        <TableCell>
                          {new Date(a.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;
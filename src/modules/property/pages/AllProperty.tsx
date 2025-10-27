import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Download,
  FileText,
  Sheet,
} from "lucide-react";
import { Card, CardContent } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import Layout from "@/modules/layout/admin-layout/Layout";
import { Input } from "@/lib/components/ui/input";
import { Badge } from "@/lib/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserEstates,
  selectEstates,
  selectEstatesLoading,
  selectEstatesError,
  selectEstatesPagination,
  selectEstatesStats,
  removeEstate,
} from "../features/EstatesSlice";
import type { AppDispatch } from "@/store/store";
import { selectUserId } from "@/modules/authentication/user/auth-slice/auth.slice";
import PropertiesTable from "../components/PropertiesTable";
import AddPropertyModal from "../components/AddProperty";
import { openAddPropertyModal } from "../features/AddPropertyModalSlice";

const AllProperty: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(selectUserId);
  const estates = useSelector(selectEstates);
  const loading = useSelector(selectEstatesLoading);
  const error = useSelector(selectEstatesError);
  const pagination = useSelector(selectEstatesPagination);
  const stats = useSelector(selectEstatesStats);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchUserEstates({ userId, page: currentPage, limit: itemsPerPage })
      );
    }
  }, [dispatch, userId, currentPage, itemsPerPage]);

  const filteredEstates = useMemo(() => {
    return estates.filter((estate) => {
      const matchesSearch =
        estate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        estate.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${estate.owner.firstName} ${estate.owner.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || estate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [estates, searchQuery, statusFilter]);

  // Export functions
  const exportToCSV = () => {
    const headers = [
      "Property Name",
      "Location",
      "Owner",
      "Status",
      "Total Units",
      "Occupied Units",
      "Occupancy Rate",
      "Monthly Revenue",
      "Last Updated",
    ];

    const csvData = filteredEstates.map((estate) => {
      const occupiedUnits = estate.units.filter(
        (unit: any) => unit.status === "occupied"
      ).length;
      const occupancyRate = getOccupancyRate(estate);
      const monthlyRevenue = getTotalRevenue(estate);

      return [
        `"${estate.name}"`,
        `"${estate.location}"`,
        `"${estate.owner.firstName} ${estate.owner.lastName}"`,
        estate.status,
        estate.totalUnits,
        occupiedUnits,
        `${occupancyRate}%`,
        `$${monthlyRevenue.toLocaleString()}`,
        new Date(estate.updatedAt).toLocaleDateString(),
      ];
    });

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    downloadFile(csvContent, "properties.csv", "text/csv");
  };

  const exportToJSON = () => {
    const jsonData = filteredEstates.map((estate) => {
      const occupiedUnits = estate.units.filter(
        (unit: any) => unit.status === "occupied"
      ).length;
      const occupancyRate = getOccupancyRate(estate);
      const monthlyRevenue = getTotalRevenue(estate);

      return {
        id: estate.id,
        name: estate.name,
        location: estate.location,
        owner: `${estate.owner.firstName} ${estate.owner.lastName}`,
        status: estate.status,
        totalUnits: estate.totalUnits,
        occupiedUnits: occupiedUnits,
        occupancyRate: `${occupancyRate}%`,
        monthlyRevenue: `$${monthlyRevenue.toLocaleString()}`,
        lastUpdated: new Date(estate.updatedAt).toLocaleDateString(),
        units: estate.units.map((unit: any) => ({
          unitNumber: unit.unitNumber,
          status: unit.status,
          monthlyRent: unit.monthlyRent,
          tenant: unit.tenant,
        })),
      };
    });

    const jsonString = JSON.stringify(jsonData, null, 2);
    downloadFile(jsonString, "properties.json", "application/json");
  };

  const exportToPDF = async () => {
    // For PDF generation, you would typically use a library like jspdf
    // This is a simplified version - you might want to use a proper PDF library
    const pdfContent = `
      PROPERTIES REPORT
      Generated on: ${new Date().toLocaleDateString()}
      Total Properties: ${filteredEstates.length}

      ${filteredEstates
        .map(
          (estate) => `
        Property: ${estate.name}
        Location: ${estate.location}
        Owner: ${estate.owner.firstName} ${estate.owner.lastName}
        Status: ${estate.status}
        Units: ${estate.totalUnits} total, ${
            estate.units.filter((u: any) => u.status === "occupied").length
          } occupied
        Monthly Revenue: $${getTotalRevenue(estate).toLocaleString()}
        ---
      `
        )
        .join("\n")}
    `;

    downloadFile(pdfContent, "properties-report.txt", "text/plain");

    // For actual PDF generation, consider using:
    // import jsPDF from 'jspdf';
    // const doc = new jsPDF();
    // doc.text(pdfContent, 10, 10);
    // doc.save('properties.pdf');
  };

  const exportToExcel = () => {
    // For Excel export, you can create a CSV that Excel can open
    // For more advanced Excel features, consider using a library like xlsx
    const excelData = [
      ["Properties Export", "", "", "", "", "", "", "", ""],
      [
        "Generated on:",
        new Date().toLocaleDateString(),
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      ["", "", "", "", "", "", "", "", ""],
      [
        "Property Name",
        "Location",
        "Owner",
        "Status",
        "Total Units",
        "Occupied Units",
        "Occupancy Rate",
        "Monthly Revenue",
        "Last Updated",
      ],
    ];

    const dataRows = filteredEstates.map((estate) => {
      const occupiedUnits = estate.units.filter(
        (unit: any) => unit.status === "occupied"
      ).length;
      const occupancyRate = getOccupancyRate(estate);
      const monthlyRevenue = getTotalRevenue(estate);

      return [
        estate.name,
        estate.location,
        `${estate.owner.firstName} ${estate.owner.lastName}`,
        estate.status,
        estate.totalUnits,
        occupiedUnits,
        `${occupancyRate}%`,
        `$${monthlyRevenue.toLocaleString()}`,
        new Date(estate.updatedAt).toLocaleDateString(),
      ];
    });

    const excelContent = [...excelData, ...dataRows]
      .map((row) => row.join(","))
      .join("\n");

    downloadFile(excelContent, "properties.xls", "application/vnd.ms-excel");
  };

  const downloadFile = (
    content: string,
    fileName: string,
    mimeType: string
  ) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "maintenance":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            <Wrench className="w-3 h-3 mr-1" />
            Maintenance
          </Badge>
        );
      case "inactive":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-600 hover:bg-gray-100"
          >
            <Clock className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getOccupancyRate = (estate: any) => {
    const occupiedUnits = estate.units.filter(
      (unit: any) => unit.status === "occupied"
    ).length;
    const rate =
      estate.totalUnits > 0 ? (occupiedUnits / estate.totalUnits) * 100 : 0;
    return Math.round(rate);
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getTotalRevenue = (estate: any) => {
    return estate.units
      .filter((unit: any) => unit.status === "occupied")
      .reduce(
        (sum: number, unit: any) => sum + parseFloat(unit.monthlyRent),
        0
      );
  };

  const handleDeleteEstate = (estateId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this property? This action cannot be undone."
      )
    ) {
      dispatch(removeEstate(estateId));
    }
  };

  const handleEditEstate = (estateId: string) => {
    console.log("Edit estate:", estateId);
  };

  const handleViewEstate = (estateId: string) => {
    console.log("View estate:", estateId);
  };

  const handleAddProperty = () => {
    dispatch(openAddPropertyModal());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading && estates.length === 0) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Error Loading Properties
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button
                  onClick={() =>
                    userId &&
                    dispatch(
                      fetchUserEstates({
                        userId,
                        page: currentPage,
                        limit: itemsPerPage,
                      })
                    )
                  }
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor your property portfolio
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[1rem]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToExcel}>
                  <Sheet className="w-4 h-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToJSON}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleAddProperty}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Button>
          </div>
        </div>

        <Card className="p-0 border-none shadow-none">
          <CardContent className="p-0 border-none">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search properties, locations, or owners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <PropertiesTable
          estates={estates}
          filteredEstates={filteredEstates}
          pagination={pagination}
          currentPage={currentPage}
          itemsPerPage={10}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onPageChange={handlePageChange}
          onViewEstate={handleViewEstate}
          onEditEstate={handleEditEstate}
          onDeleteEstate={handleDeleteEstate}
          onAddProperty={handleAddProperty}
          getStatusBadge={getStatusBadge}
          getOccupancyRate={getOccupancyRate}
          getOccupancyColor={getOccupancyColor}
          getTotalRevenue={getTotalRevenue}
        />

        <AddPropertyModal />
      </div>
    </Layout>
  );
};

export default AllProperty;

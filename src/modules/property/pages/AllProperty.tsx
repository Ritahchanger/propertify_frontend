import React, { useState, useMemo, useEffect } from "react";
import {
  Building2,
  Users,
  DollarSign,
  Search,
  Plus,
  Home,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
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
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleAddProperty}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Property
          </Button>
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

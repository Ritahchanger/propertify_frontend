import React, { useState, useMemo } from 'react';
import {
  Building2,
  Users,
  DollarSign,
  MapPin,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Home,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import {
  Button
} from '@/lib/components/ui/button';
import Layout from '@/modules/layout/admin-layout/Layout';
import {
  Input
} from '@/lib/components/ui/input';
import {
  Badge
} from '@/lib/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/lib/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/components/ui/avatar';

import { mockProperties } from '../data/data';

import SummaryCards from '../components/SummaryCards';

// Mock data for properties


const AllProperty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Filter and search logic
  const filteredProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.owner.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      const matchesType = typeFilter === 'all' || property.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'revenue':
          return b.monthlyRevenue - a.monthlyRevenue;
        case 'units':
          return b.totalUnits - a.totalUnits;
        case 'occupancy':
          return (b.occupiedUnits / b.totalUnits) - (a.occupiedUnits / a.totalUnits);
        case 'date':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, typeFilter, sortBy]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'maintenance':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Wrench className="w-3 h-3 mr-1" />Maintenance</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100"><Clock className="w-3 h-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getOccupancyRate = (occupied: number, total: number) => {
    const rate = (occupied / total) * 100;
    return Math.round(rate);
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const totalProperties = filteredProperties.length;
    const totalUnits = filteredProperties.reduce((sum, prop) => sum + prop.totalUnits, 0);
    const totalOccupied = filteredProperties.reduce((sum, prop) => sum + prop.occupiedUnits, 0);
    const totalRevenue = filteredProperties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0);
    const totalMaintenanceRequests = filteredProperties.reduce((sum, prop) => sum + prop.maintenanceRequests, 0);
    const occupancyRate = totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0;

    return {
      totalProperties,
      totalUnits,
      totalOccupied,
      totalRevenue,
      totalMaintenanceRequests,
      occupancyRate
    };
  }, [filteredProperties]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your property portfolio</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Property
          </Button>
        </div>

        {/* Summary Cards */}

        <SummaryCards summaryStats={summaryStats}/>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search properties, addresses, or owners..."
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

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="Student Housing">Student Housing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="units">Units</SelectItem>
                    <SelectItem value="occupancy">Occupancy</SelectItem>
                    <SelectItem value="date">Date Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(property.status)}
                </div>
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm hover:bg-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Property
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {property.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.address}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {property.type}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0 pb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Units</span>
                      <Home className="h-3 w-3 text-gray-500" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {property.occupiedUnits}/{property.totalUnits}
                    </p>
                    <p className={`text-xs font-medium ${getOccupancyColor(getOccupancyRate(property.occupiedUnits, property.totalUnits))}`}>
                      {getOccupancyRate(property.occupiedUnits, property.totalUnits)}% occupied
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Revenue</span>
                      <DollarSign className="h-3 w-3 text-gray-500" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      KSh {(property.monthlyRevenue / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-3 w-3 text-orange-500 mr-1" />
                      <span className="text-gray-600">{property.maintenanceRequests} requests</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 text-blue-500 mr-1" />
                      <span className="text-gray-600">{property.pendingApplications} pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 pb-4">
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={property.owner.avatar} alt={property.owner.name} />
                        <AvatarFallback className="text-xs">
                          {property.owner.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-600">Owner: {property.owner.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={property.manager.avatar} alt={property.manager.name} />
                        <AvatarFallback className="text-xs">
                          {property.manager.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-600">Manager: {property.manager.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      Added {new Date(property.dateAdded).toLocaleDateString()}
                    </div>
                    <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:text-blue-600">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first property.'
                }
              </p>
              {(!searchQuery && statusFilter === 'all' && typeFilter === 'all') && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Property
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AllProperty;
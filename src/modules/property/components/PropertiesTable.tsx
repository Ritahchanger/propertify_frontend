import {
    Building2,
    MapPin,
    Plus,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Home,
    DoorOpen,
    Bath,
    Bed,
    X,
    DollarSign,
  } from "lucide-react";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/lib/components/ui/card";
  import { Button } from "@/lib/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from "@/lib/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback } from "@/lib/components/ui/avatar";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/lib/components/ui/table";
  import { Badge } from "@/lib/components/ui/badge";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/lib/components/ui/dialog";
  
  // Types
  import type { PaginationInfo, Estate, Unit } from "@/shared";

  import { useState } from "react";

  import { useNavigate } from "react-router-dom";
  
  interface PropertiesTableProps {
    estates: Estate[];
    filteredEstates: Estate[];
    loading?: boolean;
    pagination: PaginationInfo;
    currentPage: number;
    itemsPerPage: number;
    searchQuery: string;
    statusFilter: string;
    onPageChange: (page: number) => void;
    onViewEstate: (estateId: string) => void;
    onEditEstate: (estateId: string) => void;
    onDeleteEstate: (estateId: string) => void;
    onViewUnits?: (estateId: string) => void;
    onAddProperty?: () => void;
    getStatusBadge: (status: string) => any;
    getOccupancyRate: (estate: Estate) => number;
    getOccupancyColor: (rate: number) => string;
    getTotalRevenue: (estate: Estate) => number;
  }
  
  const PropertiesTable: React.FC<PropertiesTableProps> = ({
    estates,
    filteredEstates,
    loading = false,
    pagination,
    currentPage,
    itemsPerPage,
    searchQuery,
    statusFilter,
    onPageChange,
    onViewEstate,
    onEditEstate,
    onDeleteEstate,
    onViewUnits,
    onAddProperty,
    getStatusBadge,
    getOccupancyRate,
    getOccupancyColor,
    getTotalRevenue,
  }) => {
    const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
    const [showUnitsModal, setShowUnitsModal] = useState(false);
  
    const totalPages = Math.ceil(pagination.totalCount / itemsPerPage);
  
    // Helper function to get unit status counts
    const getUnitStatusCounts = (estate: Estate) => {
      const occupied = estate.units.filter(unit => unit.status === "occupied").length;
      const vacant = estate.units.filter(unit => unit.status === "vacant").length;
      const maintenance = estate.units.filter(unit => unit.status === "maintenance").length;
      
      return { occupied, vacant, maintenance };
    };

    const navigate = useNavigate();
  
    // Helper function to get unit status badges
    const getUnitStatusBadges = (estate: Estate) => {
      const { occupied, vacant, maintenance } = getUnitStatusCounts(estate);
      
      return (
        <div className="flex flex-wrap gap-1">
          {occupied > 0 && (
            <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
              {occupied} occupied
            </Badge>
          )}
          {vacant > 0 && (
            <Badge variant="outline" className="text-xs">
              {vacant} vacant
            </Badge>
          )}
          {maintenance > 0 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
              {maintenance} maintenance
            </Badge>
          )}
        </div>
      );
    };
  
    const handleViewUnits = (estateId: string) => {
      const estate = estates.find(e => e.id === estateId);
      if (estate) {
        setSelectedEstate(estate);
        setShowUnitsModal(true);
      }
      // Also call the parent handler if provided
      if (onViewUnits) {
        onViewUnits(estateId);
      }
    };
  
    const getUnitStatusBadge = (status: string) => {
      switch (status) {
        case "occupied":
          return <Badge className="bg-green-100 text-green-800">Occupied</Badge>;
        case "vacant":
          return <Badge variant="outline">Vacant</Badge>;
        case "maintenance":
          return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    };
  
    if (loading && estates.length === 0) {
      return (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </CardContent>
        </Card>
      );
    }
  
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Properties Management</CardTitle>
            <CardDescription>
              Manage all your properties, view details, edit information, or remove
              properties from your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Unit Status</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEstates.map((estate) => {
                  const occupancyRate = getOccupancyRate(estate);
                  const totalRevenue = getTotalRevenue(estate);
                  const { occupied, vacant, maintenance } = getUnitStatusCounts(estate);
  
                  return (
                    <TableRow key={estate.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Building2 className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {estate.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-[200px]">
                              {estate.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{estate.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {estate.owner.firstName[0]}
                              {estate.owner.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {estate.owner.firstName} {estate.owner.lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Home className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            {estate.units.length} / {estate.totalUnits}
                            <div className="text-xs text-gray-500">
                              units added
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getUnitStatusBadges(estate)}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`text-sm font-medium ${getOccupancyColor(
                            occupancyRate
                          )}`}
                        >
                          {occupancyRate}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {occupied} of {estate.totalUnits} occupied
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-gray-900">
                          KSh {Math.round(totalRevenue).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">monthly</div>
                        {occupied > 0 && (
                          <div className="text-xs text-green-600">
                            KSh {Math.round(totalRevenue / occupied).toLocaleString()} avg/unit
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(estate.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {new Date(estate.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onViewEstate(estate.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewUnits(estate.id)}
                            >
                              <DoorOpen className="h-4 w-4 mr-2" />
                              View Units
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditEstate(estate.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Property
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onDeleteEstate(estate.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Property
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
  
            {/* Empty State */}
            {filteredEstates.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by adding your first property."}
                </p>
                {!searchQuery && statusFilter === "all" && onAddProperty && (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={onAddProperty}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Property
                  </Button>
                )}
              </div>
            )}
          </CardContent>
  
          {/* Pagination */}
          {filteredEstates.length > 0 && (
            <CardFooter className="flex items-center justify-between border-t border-neutral-300 px-6 py-4">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, pagination.totalCount)} of{" "}
                {pagination.totalCount} properties
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
  
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(pageNum)}
                        className={
                          currentPage === pageNum ? "bg-blue-600 text-white" : ""
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
  
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
  
        {/* Units Modal */}
        <Dialog open={showUnitsModal} onOpenChange={setShowUnitsModal}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-blue-600" />
                Units for {selectedEstate?.name}
                <Badge variant="outline" className="ml-2">
                  {selectedEstate?.units.length} units
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Unit Statistics */}
              {selectedEstate && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedEstate.units.filter(u => u.status === 'occupied').length}
                    </div>
                    <div className="text-sm text-green-800">Occupied</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">
                      {selectedEstate.units.filter(u => u.status === 'vacant').length}
                    </div>
                    <div className="text-sm text-gray-800">Vacant</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedEstate.units.filter(u => u.status === 'maintenance').length}
                    </div>
                    <div className="text-sm text-yellow-800">Maintenance</div>
                  </div>
                </div>
              )}
  
              {/* Units Table */}
              <div className="border rounded-sm border-neutral-300">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit Number</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Monthly Rent</TableHead>
                      <TableHead>Bedrooms</TableHead>
                      <TableHead>Bathrooms</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedEstate?.units.map((unit: Unit) => (
                      <TableRow key={unit.id} onClick={()=>{

                      navigate(`/dashboard/property/${unit.id}`)

                      }}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Home className="h-4 w-4 text-gray-400" />
                            <span>{unit.unitNumber}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getUnitStatusBadge(unit.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span>KSh {parseFloat(unit.monthlyRent).toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Bed className="h-4 w-4 text-gray-400" />
                            <span>{unit.bedrooms}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Bath className="h-4 w-4 text-gray-400" />
                            <span>{unit.bathrooms}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
  
              {selectedEstate?.units.length === 0 && (
                <div className="text-center py-8">
                  <DoorOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Units Added
                  </h3>
                  <p className="text-gray-600">
                    This property doesn't have any units added yet.
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default PropertiesTable;
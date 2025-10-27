import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/modules/layout/admin-layout/Layout";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { Badge } from "@/lib/components/ui/badge";
import { Textarea } from "@/lib/components/ui/textarea";
import {
  Search,
  Plus,
  Eye,
  MoreVertical,
  Home,
  Bed,
  Bath,
  DollarSign,
  Square,
} from "lucide-react";
import { toast } from "sonner";

import { getOwnerVacantUnits } from "@/modules/property/features/UnitSlice";

import type { AppDispatch } from "@/store/store";

import { selectUserId } from "@/modules/authentication/user/auth-slice/auth.slice";

// Types

interface Estate {
  id: string;
  name: string;
  location: string;
  status: string;
  totalUnits: number;
}

interface Unit {
  id: string;
  unitNumber: string;
  status: string;
  monthlyRent: string;
  bedrooms: number;
  bathrooms: number;
  depositAmount: string;
  unitType: string;
  floorArea: string;
  description: string;
  estateId: string;
  created_at: string;
  updated_at: string;
  estate: Estate;
}

interface CreateUnitData {
  estateId: string;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: string;
  depositAmount: string;
  unitType: string;
  floorArea: string;
  status: string;
  description: string;
}

const VacantUnits = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vacantUnits, vacantUnitsLoading, vacantUnitsError } = useSelector(
    (state: any) => state.units
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstate, setSelectedEstate] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const ownerId = useSelector(selectUserId);
  // Form state
  const [formData, setFormData] = useState<CreateUnitData>({
    estateId: "",
    unitNumber: "",
    bedrooms: 0,
    bathrooms: 0,
    monthlyRent: "",
    depositAmount: "",
    unitType: "",
    floorArea: "",
    status: "vacant",
    description: "",
  });

  // Fetch vacant units on component mount
  useEffect(() => {
    dispatch(getOwnerVacantUnits(ownerId as string));
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (vacantUnitsError) {
      toast.error(vacantUnitsError);
    }
  }, [vacantUnitsError]);

  // Filter units based on search and estate
  const filteredUnits = vacantUnits.filter((unit: Unit) => {
    const matchesSearch =
      unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.estate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (unit.unitType &&
        unit.unitType.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesEstate =
      selectedEstate === "all" || unit.estateId === selectedEstate;

    return matchesSearch && matchesEstate;
  });

  const handleInputChange = (
    field: keyof CreateUnitData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      estateId: "",
      unitNumber: "",
      bedrooms: 0,
      bathrooms: 0,
      monthlyRent: "",
      depositAmount: "",
      unitType: "",
      floorArea: "",
      status: "vacant",
      description: "",
    });
  };

  const handleAddUnit = () => {
    // Validate form
    if (!formData.estateId || !formData.unitNumber || !formData.monthlyRent) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Here you would dispatch createUnit action
    // dispatch(createUnit(formData));

    // For now, just show success message and close modal
    setIsAddModalOpen(false);
    resetForm();
    toast.success("Unit added successfully.");
  };

  const openViewModal = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsViewModalOpen(true);
  };

  // Get unique estates for filter dropdown
  const uniqueEstates = Array.from(
    new Map(
      vacantUnits.map((unit: Unit) => [unit.estate.id, unit.estate])
    ).values()
  );

  // Calculate stats
  const totalVacant = filteredUnits.length;
  const avgRent =
    totalVacant > 0
      ? filteredUnits.reduce(
          (sum: number, unit: Unit) => sum + parseFloat(unit.monthlyRent),
          0
        ) / totalVacant
      : 0;
  const avgFloorArea =
    totalVacant > 0
      ? filteredUnits.reduce(
          (sum: number, unit: Unit) => sum + parseFloat(unit.floorArea || "0"),
          0
        ) / totalVacant
      : 0;

  if (vacantUnitsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading vacant units...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 px-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vacant Units</h1>
            <p className="text-muted-foreground">
              Manage and view all vacant rental units
            </p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Unit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Unit</DialogTitle>
                <DialogDescription>
                  Create a new vacant unit. Fill in all required information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estate" className="text-right">
                    Estate *
                  </Label>
                  <Select
                    value={formData.estateId}
                    onValueChange={(value) =>
                      handleInputChange("estateId", value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select estate" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueEstates.map((estate: any) => (
                        <SelectItem key={estate.id} value={estate.id}>
                          {estate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unitNumber" className="text-right">
                    Unit Number *
                  </Label>
                  <Input
                    id="unitNumber"
                    value={formData.unitNumber}
                    onChange={(e) =>
                      handleInputChange("unitNumber", e.target.value)
                    }
                    className="col-span-3"
                    placeholder="e.g., A101"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bedrooms" className="text-right">
                    Bedrooms
                  </Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) =>
                      handleInputChange(
                        "bedrooms",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="col-span-3"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bathrooms" className="text-right">
                    Bathrooms
                  </Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) =>
                      handleInputChange(
                        "bathrooms",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="col-span-3"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="monthlyRent" className="text-right">
                    Monthly Rent *
                  </Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) =>
                      handleInputChange("monthlyRent", e.target.value)
                    }
                    className="col-span-3"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="depositAmount" className="text-right">
                    Deposit Amount
                  </Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    value={formData.depositAmount}
                    onChange={(e) =>
                      handleInputChange("depositAmount", e.target.value)
                    }
                    className="col-span-3"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unitType" className="text-right">
                    Unit Type
                  </Label>
                  <Select
                    value={formData.unitType}
                    onValueChange={(value) =>
                      handleInputChange("unitType", value)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Studio">Studio</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                      <SelectItem value="Penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="floorArea" className="text-right">
                    Floor Area (sq ft)
                  </Label>
                  <Input
                    id="floorArea"
                    type="number"
                    value={formData.floorArea}
                    onChange={(e) =>
                      handleInputChange("floorArea", e.target.value)
                    }
                    className="col-span-3"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="col-span-3"
                    placeholder="Unit description..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={handleAddUnit}>
                  Add Unit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Vacant
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVacant}</div>
              <p className="text-xs text-muted-foreground">Available units</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Monthly Rent
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                KES {Math.round(avgRent).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Per month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Floor Area
              </CardTitle>
              <Square className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(avgFloorArea)} sq ft
              </div>
              <p className="text-xs text-muted-foreground">Average size</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estates</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueEstates.length}</div>
              <p className="text-xs text-muted-foreground">
                Properties with vacant units
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by unit number, estate, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedEstate} onValueChange={setSelectedEstate}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Estates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Estates</SelectItem>
                  {uniqueEstates.map((estate: any) => (
                    <SelectItem key={estate.id} value={estate.id}>
                      {estate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Units Table */}
        <Card>
          <CardHeader>
            <CardTitle>Vacant Units ({totalVacant})</CardTitle>
            <CardDescription>
              All vacant units available for rent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                {totalVacant === 0
                  ? "No vacant units found"
                  : `Showing ${totalVacant} vacant units`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit</TableHead>
                  <TableHead>Estate</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Bedrooms</TableHead>
                  <TableHead className="text-center">Bathrooms</TableHead>
                  <TableHead>Floor Area</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map((unit: Unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">
                      {unit.unitNumber}
                    </TableCell>
                    <TableCell>{unit.estate.name}</TableCell>
                    <TableCell>{unit.unitType || "N/A"}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Bed className="h-4 w-4" />
                        {unit.bedrooms}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Bath className="h-4 w-4" />
                        {unit.bathrooms}
                      </div>
                    </TableCell>
                    <TableCell>
                      {unit.floorArea ? `${unit.floorArea} sq ft` : "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      KES {parseFloat(unit.monthlyRent).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Vacant
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openViewModal(unit)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Unit Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Unit Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedUnit?.unitNumber}
              </DialogDescription>
            </DialogHeader>
            {selectedUnit && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Unit Number
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedUnit.unitNumber}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Estate
                    </Label>
                    <p className="text-lg font-semibold">
                      {selectedUnit.estate.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Unit Type
                    </Label>
                    <p className="text-lg">{selectedUnit.unitType || "N/A"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Vacant
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Bedrooms
                    </Label>
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      <p className="text-lg">{selectedUnit.bedrooms}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Bathrooms
                    </Label>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4" />
                      <p className="text-lg">{selectedUnit.bathrooms}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Floor Area
                    </Label>
                    <div className="flex items-center gap-2">
                      <Square className="h-4 w-4" />
                      <p className="text-lg">
                        {selectedUnit.floorArea || "N/A"}{" "}
                        {selectedUnit.floorArea && "sq ft"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Monthly Rent
                    </Label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <p className="text-xl font-bold">
                        KES{" "}
                        {parseFloat(selectedUnit.monthlyRent).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Deposit Amount
                    </Label>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <p className="text-xl font-bold">
                        KES{" "}
                        {parseFloat(
                          selectedUnit.depositAmount
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedUnit.description && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Description
                    </Label>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedUnit.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Created
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedUnit.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Last Updated
                    </Label>
                    <p className="text-sm">
                      {new Date(selectedUnit.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default VacantUnits;

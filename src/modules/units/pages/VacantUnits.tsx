import React, { useState, useEffect } from 'react';
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
    Edit,
    Eye,
    Trash2,
    Filter,
    MoreVertical,
    Home,
    Bed,
    Bath,
    DollarSign,
    Square
} from "lucide-react";


import { toast } from 'sonner';

// Types
interface Unit {
    id: string;
    estateId: string;
    unitNumber: string;
    bedrooms: number;
    bathrooms: number;
    monthlyRent: number;
    depositAmount: number;
    unitType: string;
    floorArea: number;
    status: 'vacant' | 'occupied' | 'maintenance' | 'reserved';
    description: string;
    estateName: string;
    createdAt: string;
    updatedAt: string;
}

interface Estate {
    id: string;
    name: string;
}

const VacantUnits = () => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [estates, setEstates] = useState<Estate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEstate, setSelectedEstate] = useState<string>('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        estateId: '',
        unitNumber: '',
        bedrooms: '',
        bathrooms: '',
        monthlyRent: '',
        depositAmount: '',
        unitType: '',
        floorArea: '',
        description: '',
    });

    // Mock data - replace with actual API calls
    useEffect(() => {
        const mockUnits: Unit[] = [
            {
                id: '1',
                estateId: 'estate-1',
                unitNumber: 'A101',
                bedrooms: 2,
                bathrooms: 2,
                monthlyRent: 1500,
                depositAmount: 3000,
                unitType: 'Apartment',
                floorArea: 850.5,
                status: 'vacant',
                description: 'Modern 2-bedroom apartment with city view',
                estateName: 'Sunset Heights',
                createdAt: '2024-01-15',
                updatedAt: '2024-01-15',
            },
            {
                id: '2',
                estateId: 'estate-1',
                unitNumber: 'B205',
                bedrooms: 3,
                bathrooms: 2,
                monthlyRent: 2200,
                depositAmount: 4400,
                unitType: 'Apartment',
                floorArea: 1200.0,
                status: 'vacant',
                description: 'Spacious 3-bedroom unit with balcony',
                estateName: 'Sunset Heights',
                createdAt: '2024-01-20',
                updatedAt: '2024-01-20',
            },
            {
                id: '3',
                estateId: 'estate-2',
                unitNumber: 'C301',
                bedrooms: 1,
                bathrooms: 1,
                monthlyRent: 1200,
                depositAmount: 2400,
                unitType: 'Studio',
                floorArea: 600.0,
                status: 'vacant',
                description: 'Cozy studio apartment perfect for singles',
                estateName: 'Green Valley',
                createdAt: '2024-02-01',
                updatedAt: '2024-02-01',
            },
        ];

        const mockEstates: Estate[] = [
            { id: 'estate-1', name: 'Sunset Heights' },
            { id: 'estate-2', name: 'Green Valley' },
            { id: 'estate-3', name: 'Ocean View Towers' },
        ];

        setUnits(mockUnits);
        setEstates(mockEstates);
        setLoading(false);
    }, []);

    // Filter units based on search and estate
    const filteredUnits = units.filter(unit => {
        const matchesSearch =
            unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.estateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            unit.unitType.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesEstate = selectedEstate === 'all' || unit.estateId === selectedEstate;

        return matchesSearch && matchesEstate;
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({
            estateId: '',
            unitNumber: '',
            bedrooms: '',
            bathrooms: '',
            monthlyRent: '',
            depositAmount: '',
            unitType: '',
            floorArea: '',
            description: '',
        });
    };

    const handleAddUnit = () => {
        // Validate form
        if (!formData.estateId || !formData.unitNumber || !formData.bedrooms || !formData.bathrooms || !formData.monthlyRent) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        // Create new unit
        const newUnit: Unit = {
            id: Date.now().toString(),
            estateId: formData.estateId,
            unitNumber: formData.unitNumber,
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            monthlyRent: parseFloat(formData.monthlyRent),
            depositAmount: parseFloat(formData.depositAmount),
            unitType: formData.unitType,
            floorArea: parseFloat(formData.floorArea || '0'),
            status: 'vacant',
            description: formData.description,
            estateName: estates.find(e => e.id === formData.estateId)?.name || '',
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
        };

        setUnits(prev => [...prev, newUnit]);
        setIsAddModalOpen(false);
        resetForm();

        toast({
            title: "Success",
            description: "Unit added successfully.",
        });
    };

    const handleEditUnit = () => {
        if (!selectedUnit) return;

        const updatedUnit: Unit = {
            ...selectedUnit,
            estateId: formData.estateId,
            unitNumber: formData.unitNumber,
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            monthlyRent: parseFloat(formData.monthlyRent),
            depositAmount: parseFloat(formData.depositAmount),
            unitType: formData.unitType,
            floorArea: parseFloat(formData.floorArea || '0'),
            description: formData.description,
            estateName: estates.find(e => e.id === formData.estateId)?.name || '',
            updatedAt: new Date().toISOString().split('T')[0],
        };

        setUnits(prev => prev.map(unit => unit.id === selectedUnit.id ? updatedUnit : unit));
        setIsEditModalOpen(false);
        setSelectedUnit(null);
        resetForm();

        toast({
            title: "Success",
            description: "Unit updated successfully.",
        });
    };

    const handleDeleteUnit = (unitId: string) => {
        setUnits(prev => prev.filter(unit => unit.id !== unitId));
        toast({
            title: "Success",
            description: "Unit deleted successfully.",
        });
    };

    const openEditModal = (unit: Unit) => {
        setSelectedUnit(unit);
        setFormData({
            estateId: unit.estateId,
            unitNumber: unit.unitNumber,
            bedrooms: unit.bedrooms.toString(),
            bathrooms: unit.bathrooms.toString(),
            monthlyRent: unit.monthlyRent.toString(),
            depositAmount: unit.depositAmount.toString(),
            unitType: unit.unitType,
            floorArea: unit.floorArea.toString(),
            description: unit.description,
        });
        setIsEditModalOpen(true);
    };

    const openViewModal = (unit: Unit) => {
        setSelectedUnit(unit);
        setIsViewModalOpen(true);
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-lg">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
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
                                    <Select onValueChange={(value) => handleInputChange('estateId', value)}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select estate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {estates.map(estate => (
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
                                        onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                                        className="col-span-3"
                                        placeholder="e.g., A101"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="bedrooms" className="text-right">
                                        Bedrooms *
                                    </Label>
                                    <Input
                                        id="bedrooms"
                                        type="number"
                                        value={formData.bedrooms}
                                        onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                        className="col-span-3"
                                        min="0"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="bathrooms" className="text-right">
                                        Bathrooms *
                                    </Label>
                                    <Input
                                        id="bathrooms"
                                        type="number"
                                        value={formData.bathrooms}
                                        onChange={(e) => handleInputChange('bathrooms', e.target.value)}
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
                                        onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
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
                                        onChange={(e) => handleInputChange('depositAmount', e.target.value)}
                                        className="col-span-3"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="unitType" className="text-right">
                                        Unit Type
                                    </Label>
                                    <Select onValueChange={(value) => handleInputChange('unitType', value)}>
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
                                        onChange={(e) => handleInputChange('floorArea', e.target.value)}
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
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        className="col-span-3"
                                        placeholder="Unit description..."
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
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
                            <CardTitle className="text-sm font-medium">Total Vacant</CardTitle>
                            <Home className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredUnits.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Available units
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Monthly Rent</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${filteredUnits.length > 0
                                    ? Math.round(filteredUnits.reduce((sum, unit) => sum + unit.monthlyRent, 0) / filteredUnits.length)
                                    : 0}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Per month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Floor Area</CardTitle>
                            <Square className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {filteredUnits.length > 0
                                    ? Math.round(filteredUnits.reduce((sum, unit) => sum + unit.floorArea, 0) / filteredUnits.length)
                                    : 0} sq ft
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Average size
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Estates</CardTitle>
                            <Filter className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{estates.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Properties managed
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
                                    {estates.map(estate => (
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
                        <CardTitle>Units ({filteredUnits.length})</CardTitle>
                        <CardDescription>
                            All vacant units available for rent
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>
                                {filteredUnits.length === 0 ? 'No vacant units found' : `Showing ${filteredUnits.length} vacant units`}
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
                                {filteredUnits.map((unit) => (
                                    <TableRow key={unit.id}>
                                        <TableCell className="font-medium">{unit.unitNumber}</TableCell>
                                        <TableCell>{unit.estateName}</TableCell>
                                        <TableCell>{unit.unitType}</TableCell>
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
                                        <TableCell>{unit.floorArea} sq ft</TableCell>
                                        <TableCell className="font-medium">${unit.monthlyRent.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-green-100 text-green-800">
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
                                                    <DropdownMenuItem onClick={() => openEditModal(unit)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit Unit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteUnit(unit.id)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Unit
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

                {/* Edit Unit Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Edit Unit</DialogTitle>
                            <DialogDescription>
                                Update unit information.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-estate" className="text-right">
                                    Estate *
                                </Label>
                                <Select value={formData.estateId} onValueChange={(value) => handleInputChange('estateId', value)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select estate" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {estates.map(estate => (
                                            <SelectItem key={estate.id} value={estate.id}>
                                                {estate.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-unitNumber" className="text-right">
                                    Unit Number *
                                </Label>
                                <Input
                                    id="edit-unitNumber"
                                    value={formData.unitNumber}
                                    onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-bedrooms" className="text-right">
                                    Bedrooms *
                                </Label>
                                <Input
                                    id="edit-bedrooms"
                                    type="number"
                                    value={formData.bedrooms}
                                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                    className="col-span-3"
                                    min="0"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-bathrooms" className="text-right">
                                    Bathrooms *
                                </Label>
                                <Input
                                    id="edit-bathrooms"
                                    type="number"
                                    value={formData.bathrooms}
                                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                                    className="col-span-3"
                                    min="0"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-monthlyRent" className="text-right">
                                    Monthly Rent *
                                </Label>
                                <Input
                                    id="edit-monthlyRent"
                                    type="number"
                                    value={formData.monthlyRent}
                                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                                    className="col-span-3"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-depositAmount" className="text-right">
                                    Deposit Amount
                                </Label>
                                <Input
                                    id="edit-depositAmount"
                                    type="number"
                                    value={formData.depositAmount}
                                    onChange={(e) => handleInputChange('depositAmount', e.target.value)}
                                    className="col-span-3"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-unitType" className="text-right">
                                    Unit Type
                                </Label>
                                <Select value={formData.unitType} onValueChange={(value) => handleInputChange('unitType', value)}>
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
                                <Label htmlFor="edit-floorArea" className="text-right">
                                    Floor Area (sq ft)
                                </Label>
                                <Input
                                    id="edit-floorArea"
                                    type="number"
                                    value={formData.floorArea}
                                    onChange={(e) => handleInputChange('floorArea', e.target.value)}
                                    className="col-span-3"
                                    min="0"
                                    step="0.1"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="edit-description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="button" onClick={handleEditUnit}>
                                Update Unit
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

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
                                        <Label className="text-sm font-medium text-gray-500">Unit Number</Label>
                                        <p className="text-lg font-semibold">{selectedUnit.unitNumber}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Estate</Label>
                                        <p className="text-lg font-semibold">{selectedUnit.estateName}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Unit Type</Label>
                                        <p className="text-lg">{selectedUnit.unitType}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Status</Label>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            Vacant
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Bedrooms</Label>
                                        <div className="flex items-center gap-2">
                                            <Bed className="h-4 w-4" />
                                            <p className="text-lg">{selectedUnit.bedrooms}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Bathrooms</Label>
                                        <div className="flex items-center gap-2">
                                            <Bath className="h-4 w-4" />
                                            <p className="text-lg">{selectedUnit.bathrooms}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Floor Area</Label>
                                        <div className="flex items-center gap-2">
                                            <Square className="h-4 w-4" />
                                            <p className="text-lg">{selectedUnit.floorArea} sq ft</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Monthly Rent</Label>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            <p className="text-xl font-bold">${selectedUnit.monthlyRent.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Deposit Amount</Label>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            <p className="text-xl font-bold">${selectedUnit.depositAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedUnit.description && (
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Description</Label>
                                        <p className="text-sm text-gray-700 mt-1">{selectedUnit.description}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Created</Label>
                                        <p className="text-sm">{new Date(selectedUnit.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                                        <p className="text-sm">{new Date(selectedUnit.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsViewModalOpen(false)}>
                                Close
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    setIsViewModalOpen(false);
                                    if (selectedUnit) {
                                        openEditModal(selectedUnit);
                                    }
                                }}
                            >
                                Edit Unit
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    );
};

export default VacantUnits;
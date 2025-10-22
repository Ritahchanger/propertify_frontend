import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Button } from "@/lib/components/ui/button";
import { Badge } from "@/lib/components/ui/badge";
import { toast } from "sonner";

import {
  createUnit,
  selectUnitsLoading,
  selectUnitsSuccess,
  selectUnitsError,
  clearUnitsError,
  clearUnitsSuccess,
} from "../features/UnitSlice";

import type { Estate } from "@/shared";
import type { AppDispatch } from "@/store/store";

interface UnitFormData {
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

interface AddUnitsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEstate: Estate | null;
  newUnitData: UnitFormData;
  onNewUnitDataChange: (data: UnitFormData) => void;
  onCancel: () => void;
  onSuccess?: () => void;
}

const AddUnitsModal: React.FC<AddUnitsModalProps> = ({
  open,
  onOpenChange,
  selectedEstate,
  newUnitData,
  onNewUnitDataChange,
  onCancel,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectUnitsLoading);
  const success = useSelector(selectUnitsSuccess);
  const error = useSelector(selectUnitsError);
  const [recentlyAddedUnits, setRecentlyAddedUnits] = useState<string[]>([]);

  const handleInputChange = (
    field: keyof UnitFormData,
    value: string | number
  ) => {
    onNewUnitDataChange({
      ...newUnitData,
      [field]: value,
    });
  };

  const handleSelectChange = (field: keyof UnitFormData, value: string) => {
    onNewUnitDataChange({
      ...newUnitData,
      [field]:
        field === "bedrooms" || field === "bathrooms" ? parseInt(value) : value,
    });
  };

  // Check if deposit is bigger than rent
  const isDepositValid = () => {
    const rent = parseFloat(newUnitData.monthlyRent) || 0;
    const deposit = parseFloat(newUnitData.depositAmount) || 0;
    return deposit <= rent;
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      newUnitData.unitNumber.trim() !== "" &&
      newUnitData.monthlyRent.trim() !== "" &&
      newUnitData.depositAmount.trim() !== "" &&
      newUnitData.unitType.trim() !== "" &&
      newUnitData.floorArea.trim() !== "" &&
      newUnitData.status.trim() !== "" &&
      newUnitData.description.trim() !== "" &&
      isDepositValid()
    );
  };

  const onSubmit = () => {
    if (isFormValid() && selectedEstate) {
      const unitData = {
        estateId: selectedEstate.id,
        ...newUnitData,
      };

      dispatch(createUnit(unitData));
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  // Reset form for next unit
  const resetForm = () => {
    onNewUnitDataChange({
      unitNumber: "",
      bedrooms: 1,
      bathrooms: 1,
      monthlyRent: newUnitData.monthlyRent, // Keep rent for consistency
      depositAmount: newUnitData.depositAmount, // Keep deposit for consistency
      unitType: newUnitData.unitType, // Keep unit type for consistency
      floorArea: newUnitData.floorArea, // Keep floor area for consistency
      status: "vacant",
      description: newUnitData.description, // Keep description for consistency
    });
  };

  // Handle success state
  useEffect(() => {
    if (success) {
      // Show success toast
      toast.success(`Unit ${newUnitData.unitNumber} added successfully!`, {
        description: "You can now add another unit or close the modal.",
        duration: 4000,
      });

      // Add to recently added units
      if (newUnitData.unitNumber) {
        setRecentlyAddedUnits((prev) => [...prev, newUnitData.unitNumber]);
      }

      // Reset form for next unit
      resetForm();

      // Clear success state
      dispatch(clearUnitsSuccess());

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [success, dispatch, onSuccess, newUnitData.unitNumber]);

  // Handle error state
  useEffect(() => {
    if (error) {
      try {
        // Try to parse the error as JSON to extract validation errors
        const errorData = JSON.parse(error);
        if (errorData.errors && Array.isArray(errorData.errors)) {
          // Show validation errors in toast
          errorData.errors.forEach((err: string) => {
            toast.error("Validation Error", {
              description: err,
              duration: 5000,
            });
          });
        } else {
          toast.error("Error", {
            description: error,
            duration: 5000,
          });
        }
      } catch {
        // If it's not JSON, treat it as a regular error message
        toast.error("Error", {
          description: error,
          duration: 5000,
        });
      }

      // Clear error state after displaying
      dispatch(clearUnitsError());
    }
  }, [error, dispatch]);

  // Clear recently added units when modal closes
  useEffect(() => {
    if (!open) {
      setRecentlyAddedUnits([]);
    }
  }, [open]);

  const handleCancel = () => {
    dispatch(clearUnitsError());
    setRecentlyAddedUnits([]);
    onCancel();
  };

  const handleAddAnother = () => {
    resetForm();
    dispatch(clearUnitsError());
    toast.info("Form reset", {
      description: "You can now add another unit",
      duration: 2000,
    });
  };

  const handleCloseModal = () => {
    if (recentlyAddedUnits.length > 0) {
      toast.success(
        `Added ${recentlyAddedUnits.length} unit(s) successfully!`,
        {
          duration: 3000,
        }
      );
    }
    setRecentlyAddedUnits([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-600" />
            Add Units to {selectedEstate?.name}
          </DialogTitle>
          <DialogDescription>
            Fill in the details for the new units. All fields are required.
            {recentlyAddedUnits.length > 0 && (
              <div className="mt-2">
                <span className="font-medium">Recently added: </span>
                {recentlyAddedUnits.map((unit, index) => (
                  <Badge key={index} variant="secondary" className="ml-1">
                    {unit}
                  </Badge>
                ))}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="unitNumber">Unit Number *</Label>
            <Input
              id="unitNumber"
              placeholder="e.g., A-101, B-201"
              value={newUnitData.unitNumber}
              onChange={(e) => handleInputChange("unitNumber", e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unitType">Unit Type *</Label>
            <Select
              value={newUnitData.unitType}
              onValueChange={(value) => handleSelectChange("unitType", value)}
              required
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms *</Label>
            <Select
              value={newUnitData.bedrooms.toString()}
              onValueChange={(value) => handleSelectChange("bedrooms", value)}
              required
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms *</Label>
            <Select
              value={newUnitData.bathrooms.toString()}
              onValueChange={(value) => handleSelectChange("bathrooms", value)}
              required
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Bathroom</SelectItem>
                <SelectItem value="2">2 Bathrooms</SelectItem>
                <SelectItem value="3">3 Bathrooms</SelectItem>
                <SelectItem value="4">4+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRent">Monthly Rent (KSh) *</Label>
            <Input
              id="monthlyRent"
              type="number"
              placeholder="25000"
              value={newUnitData.monthlyRent}
              onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
              required
              min="0"
              step="0.01"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="depositAmount">Deposit Amount (KSh) *</Label>
            <Input
              id="depositAmount"
              type="number"
              placeholder="50000"
              value={newUnitData.depositAmount}
              onChange={(e) =>
                handleInputChange("depositAmount", e.target.value)
              }
              required
              min="0"
              step="0.01"
              disabled={loading}
            />
            {!isDepositValid() && (
              <p className="text-sm text-red-600">
                Deposit amount cannot be greater than monthly rent
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              value={newUnitData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
              required
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacant">Vacant</SelectItem>
                {/* <SelectItem value="occupied">Occupied</SelectItem> */}
                {/* <SelectItem value="maintenance">Maintenance</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="floorArea">Floor Area (sq ft) *</Label>
            <Input
              id="floorArea"
              type="number"
              placeholder="85.5"
              value={newUnitData.floorArea}
              onChange={(e) => handleInputChange("floorArea", e.target.value)}
              required
              min="0"
              step="0.01"
              disabled={loading}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              placeholder="Describe the unit features, amenities, etc."
              value={newUnitData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          {/* Recently added units counter */}
          {recentlyAddedUnits.length > 0 && (
            <div className="text-sm text-gray-600">
              Added {recentlyAddedUnits.length} unit(s) this session
            </div>
          )}

          <div className="flex gap-3 ml-auto">
            {recentlyAddedUnits.length > 0 && (
              <Button
                variant="outline"
                onClick={handleAddAnother}
                disabled={loading}
              >
                Add Another Unit
              </Button>
            )}

            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {recentlyAddedUnits.length > 0 ? "Done" : "Cancel"}
            </Button>

            <Button
              onClick={onSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Adding Unit...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Unit
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Required fields note */}
        <div className="text-xs text-gray-500 mt-2">
          * All fields are required. Deposit amount cannot exceed monthly rent.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUnitsModal;

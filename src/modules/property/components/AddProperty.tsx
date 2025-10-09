import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { closeAddPropertyModal } from "../features/AddPropertyModalSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Textarea } from "@/lib/components/ui/textarea";
import { Button } from "@/lib/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Building2, Upload } from "lucide-react";

import { toast } from "sonner";

import { addEstate } from "../features/AddPropertyModalSlice";

import { selectUserId } from "@/modules/authentication/user/auth-slice/auth.slice";

interface EstateData {
  name: string;
  location: string;
  totalUnits: string;
  status: "active" | "maintenance" | "inactive";
  description: string;
}

const AddPropertyModal: React.FC = () => {
  const dispatch = useDispatch();
  const showAddPropertyModal = useSelector(
    (state: RootState) => state.openPropertyModal.showAddPropertyModal
  );

  // Get loading state and userId from Redux store
  const { loading, error } = useSelector(
    (state: RootState) => state.openPropertyModal
  );

  const userId = useSelector(selectUserId);

  const [newEstateData, setNewEstateData] = useState<EstateData>({
    name: "",
    location: "",
    totalUnits: "",
    status: "active",
    description: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof EstateData, string>>
  >({});

  const handleInputChange = (field: keyof EstateData, value: string) => {
    setNewEstateData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const tempErrors: Partial<Record<keyof EstateData, string>> = {};
    if (!newEstateData.name.trim())
      tempErrors.name = "Property name is required";
    if (!newEstateData.location.trim())
      tempErrors.location = "Location is required";
    if (
      !newEstateData.totalUnits ||
      isNaN(Number(newEstateData.totalUnits)) ||
      Number(newEstateData.totalUnits) <= 0
    )
      tempErrors.totalUnits = "Valid number of units is required";
    if (!newEstateData.description.trim())
      tempErrors.description = "Description is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmitEstate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // Check if user is authenticated
    if (!userId) {
      toast.error("You must be logged in to add a property");
      return;
    }

    console.log(selectUserId);

    // Prepare data for API call
    const submitData = {
      ownerId: userId,
      name: newEstateData.name.trim(),
      location: newEstateData.location.trim(),
      description: newEstateData.description.trim(),
      totalUnits: parseInt(newEstateData.totalUnits),
      status: newEstateData.status,
    };

    try {
      // Dispatch the addEstate action
      const result = await dispatch(addEstate(submitData) as any);

      if (addEstate.fulfilled.match(result)) {
        // Success case
        toast.success("Property added successfully!");

        // Reset form
        setNewEstateData({
          name: "",
          location: "",
          totalUnits: "",
          status: "active",
          description: "",
        });

        // Modal will be closed automatically by the slice
      } else if (addEstate.rejected.match(result)) {
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Add property error:", error);
    }
  };

  return (
    <Dialog
      open={showAddPropertyModal}
      onOpenChange={() => dispatch(closeAddPropertyModal())}
    >
      <DialogContent className="sm:max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Add New Property
          </DialogTitle>
        </DialogHeader>

        {/* Display API error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitEstate} className="space-y-6">
          {/* Name & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="block mb-2">
                Property Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter property name"
                value={newEstateData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location" className="block mb-2">
                Location *
              </Label>
              <Input
                id="location"
                placeholder="Enter property location"
                value={newEstateData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={errors.location ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Total Units & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="totalUnits" className="block mb-2">
                Total Units *
              </Label>
              <Input
                id="totalUnits"
                type="number"
                min="1"
                placeholder="Number of units"
                value={newEstateData.totalUnits}
                onChange={(e) =>
                  handleInputChange("totalUnits", e.target.value)
                }
                className={errors.totalUnits ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.totalUnits && (
                <p className="text-red-500 text-sm mt-1">{errors.totalUnits}</p>
              )}
            </div>

            <div>
              <Label htmlFor="status" className="block mb-2">
                Status
              </Label>
              <Select
                value={newEstateData.status}
                onValueChange={(value: "active" | "maintenance" | "inactive") =>
                  handleInputChange("status", value)
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="block mb-2">
              Property Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Enter property description..."
              value={newEstateData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className={errors.description ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={() => dispatch(closeAddPropertyModal())}
              variant="outline"
              className="px-6 py-2"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </>
              ) : (
                "Add Property"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyModal;

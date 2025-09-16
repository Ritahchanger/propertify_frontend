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
import { Select, SelectContent, SelectItem } from "@/lib/components/ui/select";
import { Building2, Upload } from "lucide-react";

interface EstateData {
    name: string;
    location: string;
    totalUnits: string;
    status: "active" | "maintenance" | "inactive";
    description: string;
    images: File[];
}

const AddPropertyModal: React.FC = () => {
    const dispatch = useDispatch();
    const showAddPropertyModal = useSelector(
        (state: RootState) => state.openPropertyModal.showAddPropertyModal
    );

    const [newEstateData, setNewEstateData] = useState<EstateData>({
        name: "",
        location: "",
        totalUnits: "",
        status: "active",
        description: "",
        images: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof EstateData, string>>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (field: keyof EstateData, value: string | File[]) => {
        setNewEstateData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        handleInputChange("images", files);
    };

    const validate = (): boolean => {
        const tempErrors: Partial<Record<keyof EstateData, string>> = {};
        if (!newEstateData.name.trim()) tempErrors.name = "Property name is required";
        if (!newEstateData.location.trim()) tempErrors.location = "Location is required";
        if (!newEstateData.totalUnits || isNaN(Number(newEstateData.totalUnits)))
            tempErrors.totalUnits = "Valid number of units required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmitEstate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        // TODO: handle submit API call here
        console.log("New Property Data:", newEstateData);

        setNewEstateData({
            name: "",
            location: "",
            totalUnits: "",
            status: "active",
            description: "",
            images: [],
        });

        dispatch(closeAddPropertyModal());
    };

    return (
        <Dialog open={showAddPropertyModal} onOpenChange={() => dispatch(closeAddPropertyModal())}>
            <DialogContent className="sm:max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        Add New Property
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmitEstate} className="space-y-6">
                    {/* Name & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name" className="block mb-2">Property Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter property name"
                                value={newEstateData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="location" className="block mb-2">Location</Label>
                            <Input
                                id="location"
                                placeholder="Enter property location"
                                value={newEstateData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>
                    </div>

                    {/* Total Units & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="totalUnits" className="block mb-2">Total Units</Label>
                            <Input
                                id="totalUnits"
                                placeholder="Number of units"
                                value={newEstateData.totalUnits}
                                onChange={(e) => handleInputChange("totalUnits", e.target.value)}
                            />
                            {errors.totalUnits && <p className="text-red-500 text-sm mt-1">{errors.totalUnits}</p>}
                        </div>

                        <div>
                            <Label htmlFor="status" className="block mb-2">Status</Label>
                            <Select
                                value={newEstateData.status}
                                onValueChange={(value) => handleInputChange("status", value)}
                            >
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
                        <Label htmlFor="description" className="block mb-2">Property Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter property description..."
                            value={newEstateData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows={4}
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
                        <div className="text-center">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Property Images</h3>
                            <p className="text-gray-600 mb-4">Drag and drop images here, or click to browse</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFilesChange}
                            />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Choose Files
                            </Button>

                            {newEstateData.images.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {newEstateData.images.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="h-16 w-16 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <Button
                            onClick={() => dispatch(closeAddPropertyModal())}
                            className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700">
                            Add Property
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPropertyModal;

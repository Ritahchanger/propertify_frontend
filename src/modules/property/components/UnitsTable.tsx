import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { DollarSign, Home, Bed, Bath } from "lucide-react";
import { useNavigate } from "react-router-dom";
const UnitsTable = ({ getUnitStatusBadge, selectedEstate }: any) => {
  const navigate = useNavigate();
  return (
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
          {selectedEstate?.units.map((unit: any) => (
            <TableRow
              key={unit.id}
              onClick={() => {
                navigate(`/dashboard/property/${unit.id}`);
              }}
            >
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4 text-gray-400" />
                  <span>{unit.unitNumber}</span>
                </div>
              </TableCell>
              <TableCell>{getUnitStatusBadge(unit.status)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>
                    KSh {parseFloat(unit.monthlyRent).toLocaleString()}
                  </span>
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
  );
};

export default UnitsTable;

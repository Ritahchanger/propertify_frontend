import { CardFooter } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button"; // Assuming you have a Button component
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"; // Import the icons

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  pagination: {
    totalCount: number;
  };
  onPageChange: (page: number) => void;
}

const EstatesPagination = ({
  currentPage,
  itemsPerPage,
  totalPages,
  pagination,
  onPageChange,
}: PaginationProps) => {
  return (
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
  );
};

export default EstatesPagination;

import { Button } from "@/components/ui/button";

type DataPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const DataPagination = ({
  page,
  totalPages,
  onPageChange,
}: DataPaginationProps) => {
  const handlePreviousPage = () => onPageChange(Math.max(0, page - 1));
  const handleNextPage = () => onPageChange(Math.min(totalPages, page + 1));

  return (
    <div className="flex items-center justify-end gap-x-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page + 1} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9"
          onClick={handlePreviousPage}
          disabled={page === 0 || totalPages === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9"
          onClick={handleNextPage}
          disabled={page === totalPages - 1 || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

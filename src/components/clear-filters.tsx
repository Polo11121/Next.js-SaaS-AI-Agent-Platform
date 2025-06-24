import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

type ClearFiltersProps = {
  isAnyFilterModified: boolean;
  onClearFilters: () => void;
};

export const ClearFilters = ({
  isAnyFilterModified,
  onClearFilters,
}: ClearFiltersProps) =>
  isAnyFilterModified ? (
    <Button
      variant="outline"
      size="sm"
      className="h-9"
      onClick={onClearFilters}
    >
      <XCircleIcon />
      Clear
    </Button>
  ) : null;

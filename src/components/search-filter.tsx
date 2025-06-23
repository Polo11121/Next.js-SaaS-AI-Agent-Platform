import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type SearchFilterProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  placeholder: string;
  isAnyFilterModified: boolean;
  onClearFilters: () => void;
};

export const SearchFilter = ({
  onSearch,
  isAnyFilterModified,
  onClearFilters,
  placeholder,
  searchTerm,
}: SearchFilterProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    onSearch(event.target.value);

  return (
    <div className="flex items-center gap-x-2 p-1">
      <div className="relative">
        <Input
          placeholder={placeholder}
          className="h-9 bg-white w-[200px] pl-7"
          value={searchTerm}
          onChange={handleSearch}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
      </div>{" "}
      {isAnyFilterModified && (
        <Button
          variant="outline"
          size="sm"
          className="h-9"
          onClick={onClearFilters}
        >
          <XCircleIcon />
          Clear
        </Button>
      )}
    </div>
  );
};

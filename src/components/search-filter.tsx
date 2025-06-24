import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

type SearchFilterProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  placeholder: string;
};

export const SearchFilter = ({
  onSearch,

  placeholder,
  searchTerm,
}: SearchFilterProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    onSearch(event.target.value);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        className="h-9 bg-white w-[200px] pl-7"
        value={searchTerm}
        onChange={handleSearch}
      />
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
    </div>
  );
};

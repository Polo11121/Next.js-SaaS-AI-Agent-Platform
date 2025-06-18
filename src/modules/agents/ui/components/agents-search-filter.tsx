import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { SearchIcon } from "lucide-react";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentsFilters();

  const handleSearch = (value: string) =>
    setFilters({ ...filters, search: value });

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
    </div>
  );
};

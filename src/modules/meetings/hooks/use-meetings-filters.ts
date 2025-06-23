import { DEFAULT_PAGE } from "@/constants";
import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
  parseAsStringEnum,
} from "nuqs";
import { MeetingStatus } from "@/modules/meetings/types";

export const useMeetingsFilters = () => {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
      clearOnDefault: true,
    }),
    status: parseAsStringEnum(Object.values(MeetingStatus)),
    agentId: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  });
  const isAnyFilterModified = !!filters.search;

  const handleClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE });
  };

  const handlePageChange = (page: number) => setFilters({ ...filters, page });

  const handleSearch = (value: string) =>
    setFilters({ ...filters, search: value });

  return {
    filters,
    isAnyFilterModified,
    handleClearFilters,
    handlePageChange,
    handleSearch,
  };
};

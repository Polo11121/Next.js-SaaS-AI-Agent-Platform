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
  const isAnyFilterModified =
    !!filters.agentId || !!filters.search || !!filters.status;

  const handleClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE, agentId: "", status: null });
  };

  const handlePageChange = (page: number) => setFilters({ ...filters, page });

  const handleStatusChange = (status: string) =>
    setFilters({ ...filters, status: status as MeetingStatus });

  const handleAgentIdChange = (agentId: string) =>
    setFilters({ ...filters, agentId });

  const handleSearch = (value: string) =>
    setFilters({ ...filters, search: value });

  return {
    filters,
    isAnyFilterModified,
    handleClearFilters,
    handlePageChange,
    handleSearch,
    handleStatusChange,
    handleAgentIdChange,
  };
};

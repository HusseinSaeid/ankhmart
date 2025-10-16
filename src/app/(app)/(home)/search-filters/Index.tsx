import { SearchInput } from "./SearchInput";
import { Categories } from "./Categories";

const SearchFilters = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput />
      <div className=" hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};
const SearchFiltersIsLoading = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput disabled />
      <div className=" hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
export { SearchFilters, SearchFiltersIsLoading };

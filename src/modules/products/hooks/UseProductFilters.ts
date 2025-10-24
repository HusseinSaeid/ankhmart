import { parseAsString, useQueryStates } from "nuqs";
export const UseProductFilters = () => {
  return useQueryStates({
    minPrice: parseAsString.withOptions({ clearOnDefault: true }),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }),
  });
};

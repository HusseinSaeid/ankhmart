import {
  parseAsStringLiteral,
  createLoader,
  parseAsString,
  parseAsArrayOf,
} from "nuqs/server";
export const sortValues = [
  "default",
  "newest",
  "oldest",
  "highest price",
  "lowest price",
] as const;

const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("default"),
  minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({ clearOnDefault: true })
    .withDefault([]),
};
export const loadProductFilters = createLoader(params);

"use client";
import { SearchInput } from "./SearchInput";
import { Categories } from "./Categories";
import { useParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BreadCrumbNavigation } from "./BreadCrumbNavigation";

const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";
  const activeCategoryDate = data.find(
    (category) => category.slug === activeCategory
  );
  const activeCategoryColor = activeCategoryDate?.color || "#f5f5f5";
  const activeCategoryName = activeCategoryDate?.name || null;

  const activeSubCategoryParam = params.subcategory as string | undefined;
  const activeSubCategoryName =
    activeCategoryDate?.subcategories.find(
      (subCategory) => subCategory.slug === activeSubCategoryParam
    )?.name || null;

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className=" hidden lg:block">
        <Categories />
      </div>
      <BreadCrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubCategoryName={activeSubCategoryName}
      />
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

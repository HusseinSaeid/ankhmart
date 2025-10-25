import type { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  ProductsList,
  ProductsListLoading,
} from "@/modules/products/ui/components/productsList";
import { Suspense } from "react";
import { ProductFilters } from "@/modules/products/ui/components/productFilters";
import { loadProductFilters } from "@/modules/products/searchParams";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>;
}
const Page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory, ...filters })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductsListLoading />}>
              <ProductsList category={subcategory} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};
export default Page;

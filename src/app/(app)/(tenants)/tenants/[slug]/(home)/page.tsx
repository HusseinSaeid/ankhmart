import type { SearchParams } from "nuqs/server";
import { getQueryClient, trpc } from "@/trpc/server";
import { ProductListView } from "@/modules/products/views/productListView";
import { loadProductFilters } from "@/modules/products/searchParams";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}
const Page = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: 10,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} />
    </HydrationBoundary>
  );
};
export default Page;

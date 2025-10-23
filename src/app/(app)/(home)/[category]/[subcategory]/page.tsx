import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  ProductsList,
  ProductsListLoading,
} from "@/modules/products/ui/components/productsList";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
}
const Page = async ({ params }: Props) => {
  const { subcategory } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductsListLoading />}>
        <ProductsList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
};
export default Page;

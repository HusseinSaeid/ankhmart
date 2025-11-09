import { ProductView } from "@/modules/library/views/productView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
interface Props {
  params: Promise<{
    productId: string;
  }>;
}
const Page = async ({ params }: Props) => {
  const { productId } = await params;
  const qurryClint = getQueryClient();
  void qurryClint.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(qurryClint)}>
      <ProductView productId={productId} />
    </HydrationBoundary>
  );
};
export default Page;

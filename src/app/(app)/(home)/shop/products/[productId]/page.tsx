import {
  ProductView,
  ProductViewSkeleton,
} from "@/modules/products/views/productView";
import { Suspense } from "react";

interface Props {
  params: Promise<{ productId: string }>;
}
const Page = async ({ params }: Props) => {
  const { productId } = await params;

  return (
    <Suspense fallback={<ProductViewSkeleton />}>
      <ProductView productId={productId} />
    </Suspense>
  );
};
export default Page;

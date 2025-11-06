import { CheckoutPageView } from "@/modules/checkout/views/checkoutPageView";

interface Props {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  return <CheckoutPageView tenantSlug={slug} />;
};
export default Page;

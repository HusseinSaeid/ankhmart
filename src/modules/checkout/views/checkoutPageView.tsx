"use client";

import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import CheckOutItem from "../ui/components/checkOutItem";
import { generateTenantUrl } from "@/lib/utils";
import { CheckOutSideBar } from "../ui/components/checkOutSideBar";
import { TbLoader2 } from "react-icons/tb";
import { TbShoppingCartOff } from "react-icons/tb";

interface CheckoutPageViewProps {
  tenantSlug: string;
}

export const CheckoutPageView = ({ tenantSlug }: CheckoutPageViewProps) => {
  const {
    productIds,
    clearCart: clearTenantCart,
    removeProduct,
  } = useCart(tenantSlug);
  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProduct.queryOptions({ ids: productIds })
  );
  useEffect(() => {
    if (!error) return;
    if (error?.data?.code === "NOT_FOUND") {
      clearTenantCart();
      toast.warning("Some products were not found, cart has been cleared.");
    }
  }, [error, clearTenantCart, tenantSlug]);
  if (isLoading) {
    return (
      <div className="lg:p-16 pt-4 px-4 lg:px-12">
        <div
          className="border border-black boeder-dashed flex items-center justify-center p-8 
          flex-col gap-y-4 bg-white w-full rounded-lg"
        >
          <TbLoader2 size={48} className="text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }
  if (data?.totalDocs === 0) {
    return (
      <div className="lg:p-16 pt-4 px-4 lg:px-12">
        <div
          className="border border-black boeder-dashed flex items-center justify-center p-8 
          flex-col gap-y-4 bg-white w-full rounded-lg"
        >
          <TbShoppingCartOff size={48} />
          <p className="text-md  font-medium"> The Cart Is Empty</p>
        </div>
      </div>
    );
  }
  return (
    <div className="lg:p-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className=" overflow-hidden flex flex-col gap-2">
            {data?.docs.map((product) => (
              <CheckOutItem
                key={product.id}
                name={product.name}
                imageUrl={product.image?.url}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckOutSideBar
            total={data?.totalPrices}
            onCheckOut={() => {}}
            isCanceled={false}
            isPanding={false}
            totalItems={data?.totalItems}
          />
        </div>
      </div>
    </div>
  );
};

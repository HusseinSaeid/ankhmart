"use client";

import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import CheckOutItem from "../ui/components/checkOutItem";
import { generateTenantUrl } from "@/lib/utils";
import { CheckOutSideBar } from "../ui/components/checkOutSideBar";
import { TbLoader2 } from "react-icons/tb";
import { TbShoppingCartOff } from "react-icons/tb";
import { useCheckOutStates } from "../hooks/useCheckOutStates";
import { useRouter } from "next/navigation";

interface CheckoutPageViewProps {
  tenantSlug: string;
}

export const CheckoutPageView = ({ tenantSlug }: CheckoutPageViewProps) => {
  const router = useRouter();

  const [states, setStates] = useCheckOutStates();

  const { productIds, clearCart, removeProduct } = useCart(tenantSlug);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProduct.queryOptions({ ids: productIds })
  );

  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ cancel: false, success: false });
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          router.push("/sign-in");
          return;
        }
        toast.error(error.message);
      },
    })
  );

  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancel: false });
      clearCart();
      queryClient.invalidateQueries(trpc.library.getMany.infiniteQueryFilter());
      router.push("/library");
    }
  }, [
    states.success,
    clearCart,
    router,
    setStates,
    queryClient,
    trpc.library.getMany,
  ]);

  useEffect(() => {
    if (!error) return;
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Some products were not found, cart has been cleared.");
    }
  }, [error, clearCart]);

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
            onPurchase={() => purchase.mutate({ tenantSlug, productIds })}
            isCanceled={states.cancel}
            isPending={purchase.isPending}
            totalItems={data?.totalItems}
          />
        </div>
      </div>
    </div>
  );
};

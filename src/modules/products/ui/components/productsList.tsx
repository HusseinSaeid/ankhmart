"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { UseProductFilters } from "../../hooks/UseProductFilters";
import { ProductCard, ProductCardSkeleton } from "./productCard";
import { Button } from "@/components/ui/button";
import { TbInboxOff } from "react-icons/tb";

interface Props {
  category?: string;
}
export const ProductsList = ({ category }: Props) => {
  const [filters] = UseProductFilters();
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        { ...filters, category, limit: 20 },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  if (data.pages?.[0]?.docs.length === 0) {
    return (
      <div
        className="border border-black boeder-dashed flex items-center justify-center p-8 
      flex-col gap-y-4 bg-white w-full rounded-lg"
      >
        <TbInboxOff size={48} />
        <p className="text-md  font-medium"> No Products Found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              price={product.price}
              sellerUserName="Sehs"
              sellerImageUrl={undefined}
              reviewRating={3}
              reviewCount={5}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant={"elevated"}
          >
            Load More Products
          </Button>
        )}
      </div>
    </>
  );
};
export const ProductsListLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

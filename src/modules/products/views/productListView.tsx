import { Suspense } from "react";
import {
  ProductsList,
  ProductsListLoading,
} from "../ui/components/productsList";
import { ProductFilters } from "../ui/components/productFilters";
import { ProductSort } from "../ui/components/productSort";

interface Prop {
  category?: string;
}

export const ProductListView = ({ category }: Prop) => {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
        <p className="text-2xl font-medium">Curated For You</p>
        <ProductSort />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductsListLoading />}>
            <ProductsList category={category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

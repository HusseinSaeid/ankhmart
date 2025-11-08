import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  ProductsList,
  ProductsListLoading,
} from "../ui/components/productsList";
import { Suspense } from "react";

export const LibraryView = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#f4f4f0] w-full border-b">
        <Link prefetch href="/shop" className="flex items-center gap-2">
          <ArrowLeft className="4" />
          <span className="text font-medium">Continue Shooping</span>
        </Link>
      </nav>
      <header className="bg-[#f4f4f0] py-8 border-b">
        <div className="max-w-(--breackpoin-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4 ">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p>Your Purchases</p>
        </div>
      </header>
      <section className="max-w-(--breackpoin-xl) mx-auto px-4 lg:px-12 py-10">
        <Suspense fallback={<ProductsListLoading />}>
          <ProductsList />
        </Suspense>
      </section>
    </div>
  );
};

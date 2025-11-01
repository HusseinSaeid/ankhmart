"use client";

import { Color, Size, Tenant } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { OptionSelector } from "../ui/components/optionSelector";
import { FaCartPlus } from "react-icons/fa6";
import { StarRating } from "@/components/starRating";

interface Props {
  productId: string;
}

export const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  const tenant = data.tenant as Tenant | null;
  const tenantColorName = "black";
  const productColors = data.color as Color[] | null;
  const productSizes = data.size as Size[] | null;

  const [selectedColor, setSelectedColor] = useQueryState("color", {});

  const [selectedSize, setSelectedSize] = useQueryState("size", {});

  return (
    <div className="px-4 lg:px-16 py-10">
      <div
        className="bg-white border rounded-md overflow-hidden flex flex-col lg:flex-row"
        style={{ borderColor: tenantColorName }}
      >
        <div
          className="relative w-full lg:w-1/2 aspect-[4/3] border-b lg:border-b-0 lg:border-r bg-[#f4f4f0] "
          style={{ borderColor: tenantColorName }}
        >
          <Image
            src={data.image?.url || "/images/placeholder.jpg"}
            alt={data.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between ">
          <div className="flex flex-col flex-1 gap-2">
            <h1 className="text-3xl lg:text-4xl font-semibold  capitalize">
              {data.name}
            </h1>
            <div>
              <p className="mt-4 text-gray-600 line-clamp-3 hover:line-clamp-none transition-all">
                {data.description}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-amber-500 tracking-tight">
                {data.price.toLocaleString()}
                <span className="text-lg font-medium"> EGP</span>
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <OptionSelector
                label="Colors"
                options={productColors ?? []}
                selected={selectedColor}
                onChange={setSelectedColor}
                type="color"
              />
              <OptionSelector
                label="Sizes"
                options={productSizes ?? []}
                selected={selectedSize}
                onChange={setSelectedSize}
                type="text"
              />
            </div>
            <div className="mt-2">
              <p>Rating:</p>
              <StarRating rating={3} iconClassName="size-5" />
            </div>

            <div className="mt-4">
              <span className="text-gray-500">Sold by: </span>
              <Link
                className="hover:underline capitalize"
                style={{ color: tenantColorName }}
                href={`/tenants/${tenant?.slug}`}
              >
                {tenant?.name}
              </Link>
            </div>
          </div>
          {data.stock === "in-stock" ? (
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                className={cn(
                  "flex-1 border-2 border-amber-400 text-amber-500 font-semibold hover:bg-amber-50 hover:text-amber-600 transition"
                )}
              >
                <FaCartPlus />
                Add to Cart
              </Button>

              <Button
                variant="elevated"
                className={cn(
                  "flex-1 bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
                )}
              >
                Buy Now
              </Button>
            </div>
          ) : (
            <div>
              <p className="font-medium text-2xl">Out of Stock</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductViewSkeleton = () => {
  return (
    <div className="px-4 lg:px-16 py-10 bg-gray-50 min-h-screen animate-pulse">
      <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-1/2 aspect-[4/3] bg-gray-200 border-b lg:border-b-0 lg:border-r" />
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
          <div className="flex flex-col flex-1 space-y-6">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-8 bg-gray-300 rounded w-1/3" />
            <div className="space-y-3">
              <div className="h-5 bg-gray-300 rounded w-1/4" />
              <div className="flex flex-wrap gap-3">
                <div className="w-12 h-6 rounded-lg bg-gray-300" />
                <div className="w-12 h-6 rounded-lg bg-gray-300" />
                <div className="w-12 h-6 rounded-lg bg-gray-300" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-5 bg-gray-300 rounded w-1/4" />
              <div className="flex flex-wrap gap-3">
                <div className="w-12 h-8 rounded-lg bg-gray-300" />
                <div className="w-12 h-8 rounded-lg bg-gray-300" />
                <div className="w-12 h-8 rounded-lg bg-gray-300" />
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
          <div className="mt-8">
            <div className="h-12 bg-gray-300 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

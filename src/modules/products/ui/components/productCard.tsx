import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const CartButton = dynamic(
  () =>
    import("@/modules/products/ui/components/cartButton").then(
      (mod) => mod.CartButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="elevated"
        disabled
        className="h-12 bg-amber-400 text-black"
      >
        {" "}
        <ShoppingCart /> Add To Cart{" "}
      </Button>
    ),
  }
);

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  sellerUserName: string;
  sellerImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  sellerUserName,
  sellerImageUrl,
  reviewRating,
  reviewCount,
  price,
}: ProductCardProps) => {
  const router = useRouter();

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/tenants/${sellerUserName}`);
  };

  return (
    <div className="border rounded-md bg-white overflow-hidden flex flex-col h-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
      {/* Product Info */}
      <Link
        href={`/tenants/${sellerUserName}/products/${id}`}
        className="flex flex-col flex-1"
      >
        {" "}
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl || "/images/placeholder.jpg"}
            className="object-cover"
          />{" "}
        </div>{" "}
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          {" "}
          <h2 className="text-lg font-medium line-clamp-4 capitalize">
            {name}
          </h2>{" "}
          <div
            onClick={handleUserClick}
            className="flex items-center gap-2 capitalize cursor-pointer"
          >
            {sellerImageUrl && (
              <Image
                alt={sellerUserName}
                src={sellerImageUrl}
                width={32}
                height={32}
                className="rounded-md border shrink-0 w-8 h-8"
              />
            )}{" "}
            <p className="text-sm underline font-medium">
              {sellerUserName}
            </p>{" "}
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              {" "}
              <Star className="w-3.5 h-3.5 fill-amber-400" />{" "}
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount}){" "}
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </Link>

      {/* Price & Cart Button (Outside Link) */}
      <div className="p-4 flex items-center justify-between">
        <div className="relative px-2 py-1 border bg-amber-400 w-fit">
          <p className="text-sm font-medium">{formatCurrency(price)}</p>
        </div>
        <div>
          <CartButton productId={id} tenantSlug={sellerUserName} />
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
);

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

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
    <Link href={`/tenants/${sellerUserName}/products/${id}`}>
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl || ""}
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4 capitalize">
            {name}
          </h2>
          <div
            onClick={handleUserClick}
            className="flex items-center gap-2 capitalize"
          >
            {sellerImageUrl && (
              <Image
                alt={sellerUserName}
                src={sellerImageUrl}
                width={32}
                height={32}
                className="rounded-md border shrink-0 size-[32px]"
              />
            )}
            <p className="text-sm underline font-medium">{sellerUserName}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400" />
              <p className="text-sm font-medium">
                {reviewRating}({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className=" relative px-2 py-1 border bg-amber-400  w-fit">
            <p className="text-sm font-medium">{formatCurrency(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export const ProductCardSkeleton = () => {
  {
    return (
      <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
    );
  }
};

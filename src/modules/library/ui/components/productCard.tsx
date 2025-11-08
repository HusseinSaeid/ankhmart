import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  sellerUserName: string;
  sellerImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  sellerUserName,
  sellerImageUrl,
  reviewRating,
  reviewCount,
}: ProductCardProps) => {
  return (
    <div className="border rounded-md bg-white overflow-hidden flex flex-col h-full hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
      {/* Product Info */}
      <Link href={`/library/${id}`} className="flex flex-col flex-1">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl || "/images/placeholder.jpg"}
            className="object-cover"
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 flex-1">
          <h2 className="text-lg font-medium line-clamp-4 capitalize">
            {name}
          </h2>
          <div className="flex items-center gap-2 capitalize cursor-pointer">
            {sellerImageUrl && (
              <Image
                alt={sellerUserName}
                src={sellerImageUrl}
                width={32}
                height={32}
                className="rounded-md border shrink-0 w-8 h-8"
              />
            )}
            <p className="text-sm underline font-medium">{sellerUserName}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />{" "}
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
);

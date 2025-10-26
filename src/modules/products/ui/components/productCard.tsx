import Link from "next/link";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";

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
  return (
    <Link href={`/product/${id}`}>
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
          <div className="flex items-center gap-2">
            {sellerImageUrl && (
              <Image
                alt={sellerUserName}
                src={sellerImageUrl}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{sellerUserName}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <LiaStarSolid className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating}({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className=" relative px-2 py-1 border bg-amber-400 w-fit">
         <div className=" relative px-2 py-1 border bg-amber-400 w-fit">
          <p className="text-sm font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EGP",
              maximumFractionDigits: 0,
            }).format(Number(price))}
          </p>
         </div>
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

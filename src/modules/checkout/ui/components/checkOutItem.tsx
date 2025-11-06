import { cn, formatCurrency } from "@/lib/utils";
import { Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CheckOutItemProps {
  name: string;
  imageUrl?: string | null;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

const CheckOutItem = ({
  name,
  imageUrl,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  onRemove,
}: CheckOutItemProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border bg-white rounded-sm "
      )}
    >
      <div className="overflow-hidden border-r p-1 ">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/images/placeholder.jpg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <h4 className="font-medium underline">{tenantName}</h4>
          </Link>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">{formatCurrency(price)}</p>
        <button
          type="button"
          onClick={onRemove}
          className="font-medium underline text-black flex items-center gap-1 cursor-pointer"
        >
          <Minus size={16} />
          Remove
        </button>
      </div>
    </div>
  );
};
export default CheckOutItem;

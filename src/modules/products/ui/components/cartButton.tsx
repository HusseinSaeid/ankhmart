import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Props {
  tenantSlug: string;
  productId: string;
  className?: string;
  isPurchased?: boolean;
}

export const CartButton = ({
  tenantSlug,
  productId,
  className,
  isPurchased,
}: Props) => {
  const cart = useCart(tenantSlug);
  if (isPurchased) {
    return (
      <Button variant={"elevated"} asChild className="flex-1 font-medium h-12">
        <Link prefetch href={`/library/${productId}`}>
          View In Library
        </Link>
      </Button>
    );
  }
  return (
    <Button
      variant={"elevated"}
      className={cn(
        "flex-1 bg-amber-400 h-12",
        cart.isProductInCart(productId) && "bg-white",
        className
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      <ShoppingCart />
      {cart.isProductInCart(productId) ? "Remove From Cart" : "Add To Cart"}
    </Button>
  );
};

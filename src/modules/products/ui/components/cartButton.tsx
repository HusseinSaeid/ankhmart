import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/useCart";
import { ShoppingCart } from "lucide-react";

interface Props {
  tenantSlug: string;
  productId: string;
  className?: string;
}

export const CartButton = ({ tenantSlug, productId, className }: Props) => {
  const cart = useCart(tenantSlug);
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

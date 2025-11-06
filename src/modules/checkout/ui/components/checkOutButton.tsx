import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/useCart";
import { cn, generateTenantUrl } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
interface Props {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
  tenantColor?: string;
}
export const CheckOutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
  tenantColor,
}: Props) => {
  const { totalItems } = useCart(tenantSlug);
  if (hideIfEmpty && totalItems === 0) return null;
  return (
    <Button
      variant={"elevated"}
      asChild
      className={cn("bg-white", className)}
      style={{ borderColor: tenantColor }}
    >
      <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
        <ShoppingCart />
        {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};

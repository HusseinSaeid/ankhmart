"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const CheckOutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkOutButton").then(
      (mod) => mod.CheckOutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled variant={"elevated"} className={cn("bg-white")}>
        <ShoppingCart />
      </Button>
    ),
  }
);
interface Props {
  slug: string;
}
export const NavBar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <nav
      className="h-20 border-b font-medium bg-white"
      style={{
        borderColor: data?.color?.name || "black",
      }}
    >
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between gap-4 items-center h-full px-4 lg:px-12">
        <Link href={`/tenants/${slug}`} className="flex items-center gap-2">
          {data?.image?.url && (
            <Image
              src={data.image.url}
              alt={data?.name || "Tenant"}
              width={40}
              height={40}
              className="rounded-md shrink-0 border shadow-lg size-[40px]"
              style={{
                borderColor: data?.color?.name === "black" ? "white" : "black",
              }}
            />
          )}
          <p
            className="text-xl capitalize"
            style={{ color: data?.color?.name === "black" ? "white" : "black" }}
          >
            {data.name}
          </p>
        </Link>
        <CheckOutButton
          tenantSlug={data.slug}
          tenantColor={data.color?.name}
          hideIfEmpty
        />
      </div>
    </nav>
  );
};
export const NavBarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between gap-4 items-center h-full px-4 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-gray-200 size-[40px]" />
          <div className="h-5 w-24 bg-gray-200 rounded-md" />
        </div>
        <Button disabled variant={"elevated"} className={cn("bg-white")}>
          <ShoppingCart />
        </Button>
      </div>
    </nav>
  );
};

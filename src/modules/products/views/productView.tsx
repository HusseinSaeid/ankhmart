"use client";

import { StarRating } from "@/components/starRating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";

interface Props {
  productId: string;
  tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );
  const tenantColor = data.tenant.color?.name || "black";
  const handleClick = () => {
    const url = window.location.href; // رابط الصفحة الحالي للمنتج
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Product link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  return (
    <div className="px-4 lg:px-12 py-10">
      <div
        className="border rounded-sm bg-white overflow-hidden"
        style={{ borderColor: tenantColor }}
      >
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data.image?.url || "/images/placeholder.jpg"}
            alt={data.name || "Product-cover"}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium capitalize">{data.name}</h1>
            </div>
            <div className="border-y flex" style={{ borderColor: tenantColor }}>
              <div
                className="px-6 py-4 flex items-center justify-center border-r"
                style={{ borderColor: tenantColor }}
              >
                <div
                  className="px-2 py-1 border bg-amber-400 w-fit"
                  style={{ borderColor: tenantColor }}
                >
                  <p className="text-base font-medium">
                    {formatCurrency(data.price)}
                  </p>
                </div>
              </div>
              <div
                className="px-6 py-4 flex items-center justify-center lg:border-r"
                style={{ borderColor: tenantColor }}
              >
                <Link
                  href={generateTenantUrl(tenantSlug)}
                  className="flex items-center gap-2"
                >
                  {data.tenant.image?.url && (
                    <Image
                      src={data.tenant.image.url}
                      alt={data.tenant.name || "Tenant Name"}
                      width={20}
                      height={20}
                      className="rounded-md border shrink-0"
                    ></Image>
                  )}
                  <p
                    className="text-base underline font-medium capitalize"
                    style={{ color: tenantColor }}
                  >
                    {data.tenant.name}
                  </p>
                </Link>
              </div>
              <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-1">
                  <StarRating rating={4} />
                </div>
              </div>
            </div>
            <div
              className="block lg:hidden px-6 py-4 items-center justify-center border-b "
              style={{ borderColor: tenantColor }}
            >
              <div className="flex items-center gap-1">
                <StarRating rating={4} />
                <p className="text-base font-medium">{5} ratings</p>
              </div>
            </div>
            <div className="p-6 ">
              {data.description ? (
                <p>{data.description}</p>
              ) : (
                <p className="font-medium text-muted-foreground italic">
                  No Description Available
                </p>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <div
              className="border-t lg:border-t-0 lg:border-l h-full"
              style={{ borderColor: tenantColor }}
            >
              <div
                className="flex flex-col gap-4 p-6 border-b"
                style={{ borderColor: tenantColor }}
              >
                <div className="flex flex-row items-center gap-2">
                  <Button
                    variant={"elevated"}
                    className="flex-1 bg-amber-400 h-12"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    className="size-12"
                    variant={"elevated"}
                    onClick={handleClick}
                    disabled={false}
                  >
                    <LinkIcon />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings </h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-amber-400" />
                    <p>({5})</p>
                    <p className="text-base">{5} ratings</p>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_fr1_auto] gap-3 mt-4">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <Fragment key={star}>
                      <div className="font-medium flex justify-between gap-2">
                        <div className="flex items-center">
                          {star} <StarIcon className="size-4 fill-amber-400" />
                        </div>
                        <Progress value={25} className="h-[1lh]" />
                        <div className="font-medium">{25}%</div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

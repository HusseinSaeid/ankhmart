"use client";
import { Button } from "@/components/ui/button";
import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReceiptSection } from "../ui/components/receiptSection";

interface Props {
  productId: string;
}
export const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#f4f4f0] w-full border-b">
        <Link prefetch href="/library" className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          <span className="text font-medium">Your Library</span>
        </Link>
      </nav>
      <header className="bg-[#f4f4f0] py-8 border-b">
        <div className="max-w-(--breackpoin-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4 ">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </header>
      <section className="max-w-(--breackpoin-xl) mx-auto px-4 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ReceiptSection
            productName={data.name}
            productId={data.id}
            orderId={data.order.id}
            tenantName={data.tenant.name}
            date={data.order.createdAt}
            price={data.price}
          />
          <div className="flex flex-col border bg-[#f4f4f0] rounded-md">
            <div className="p-4 flex justify-between border-b">
              <p>{data.name}</p>
              {formatCurrency(data.price)}
            </div>
            <div className="p-4">
              <div className="flex gap-1">
                <p> Sold By</p>
                <Link href={generateTenantUrl(data.tenant.slug)}>
                  <span className="underline capitalize">
                    {data.tenant.name}
                  </span>
                </Link>
              </div>
            </div>
            <div className="border-t p-4 flex flex-col">
              <Button variant={"elevated"}>
                <Link
                  href={`${generateTenantUrl(data.tenant.slug)}/products/${data.id}`}
                >
                  View in Store
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-[3.9] border rounded-md">
            <Image
              src={data.image?.url || "/images/placeholder.jpg"}
              alt={data.name || "Product-cover"}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4 flex flex-col lg:flex-row gap-4 rounded-md justify-between lg:items-center bg-[#f4f4f0] border">
            <p className="font-medium text-xl">
              {data.download?.filename || data.name}
            </p>
            <div className="self-end">
              {data.download?.url ? (
                <a
                  href={data.download.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="elevated">Download</Button>
                </a>
              ) : (
                <p className="font-medium">Download Link is Not Available</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

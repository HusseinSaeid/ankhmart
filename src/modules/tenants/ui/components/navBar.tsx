"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
}
export const NavBar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <nav
      className="h-20 border-b font-medium"
      style={{
        backgroundColor: data?.color?.name || "white",
        borderColor: data?.color?.name === "black" ? "white" : "black",
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
      </div>
    </nav>
  );
};
export const NavBarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex  gap-4 items-center h-full px-4 lg:px-12"></div>
    </nav>
  );
};

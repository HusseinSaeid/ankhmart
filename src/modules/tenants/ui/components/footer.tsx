"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
interface Props {
  slug: string;
}

export const Footer = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <footer
      className="h-14 border-t font-medium bg-white"
      style={{ borderColor: data.color?.name || "black" }}
    >
      <div className="max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 lg:px-12">
        <p className="text-xl">Powered by</p>
        <Link href={"/"}>
          <span className="text-2xl font-semibold">AnkhMart</span>
        </Link>
      </div>
    </footer>
  );
};
export const FooterSkeleton = () => {
  return (
    <footer className="h-14 border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 lg:px-12 ">
        <p className="text-xl">Powered by</p>
        <Link href={"/"}>
          <span className="text-2xl font-semibold">AnkhMart</span>
        </Link>
      </div>
    </footer>
  );
};
export default Footer;

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Props {
  slug: string;
}
export const NavBar = ({ slug }: Props) => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between gap-4 items-center h-full px-4 lg:px-12">
        <div className="flex justify-between items-center gap-4">
          <Button variant={"elevated"} asChild>
            <Link href={"/shop"}>
              <ArrowLeft /> MarketPlace
            </Link>
          </Button>
          <p className="text-xl capitalize">CheckOut</p>
        </div>
        <Button variant={"elevated"} asChild>
          <Link href={`/tenants/${slug}`}>
            <ArrowLeft /> Store
          </Link>
        </Button>
      </div>
    </nav>
  );
};

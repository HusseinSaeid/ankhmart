"use client";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { CategoriesSideBar } from "./CategoriesSideBar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VscListFilter } from "react-icons/vsc";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center w-full gap-2">
      <CategoriesSideBar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
        />
        <FaSearch className="absolute left-3 top-1/2 size-4 transform -translate-y-1/2 text-neutral-500" />
      </div>
      <div>
        <Button
          variant={"elevated"}
          className="shrink-0 flex lg:hidden size-12"
          onClick={() => {
            setIsSidebarOpen(true);
          }}
        >
          <VscListFilter />
        </Button>
      </div>
    </div>
  );
};

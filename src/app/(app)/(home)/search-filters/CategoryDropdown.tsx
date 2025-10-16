"use client";
import { useState, useRef } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDropDownPosition } from "./useDropDownPosition";
import { SubCategoryMenu } from "./SubCategoryMenu";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  category: CategoriesGetManyOutput[1];
  isActive: boolean;
  isNavigationHovered: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { getDropDownPosition } = useDropDownPosition(dropDownRef);

  const onMouseEnter = () => {
    if (category.subcategories) setIsOpen(true);
  };
  const onMouseLeave = () => {
    setIsOpen(false);
  };
  const dropDownPosition = getDropDownPosition();

  return (
    <div
      className="relative"
      ref={dropDownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
          <Button
            variant={"elevated"}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent  hover:bg-white hover:border-primary text-black",
              isActive && !isNavigationHovered && "bg-white border-primary ",
              isOpen &&
                "border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
            )}
          >
            <span className="capitalize">{category.name}</span>
          </Button>
        </Link>

        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute w-0 h-0 border-l-[10px]  border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>
      <SubCategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropDownPosition}
      />
    </div>
  );
};

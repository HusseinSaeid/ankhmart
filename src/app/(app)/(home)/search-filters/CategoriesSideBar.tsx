"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomCategory } from "../typs";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategoriesSideBar = ({ open, onOpenChange, data }: Props) => {
  const router = useRouter();

  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };
  const categoryBackgroundColor = selectedCategory?.color || "white";
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{
          backgroundColor: categoryBackgroundColor,
        }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>All Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {
                if (parentCategories) {
                  setParentCategories(null);
                  setSelectedCategory(null);
                }
              }}
              className="w-full text-left p-4 flex items-center text-base font-medium hover:bg-black hover:text-white"
            >
              <FaChevronLeft className="mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => {
            return (
              <button
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    category.color || "black";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    categoryBackgroundColor;
                  e.currentTarget.style.color = "black";
                }}
                style={{
                  backgroundColor: categoryBackgroundColor,
                  transition: "background-color 0.1s ease, color 0.1s ease",
                }}
                key={category.slug}
                className="cursor-pointer w-full text-left capitalize p-4 flex items-center justify-between text-base font-medium  hover:text-white"
              >
                {category.name}
                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <FaChevronRight className="mr-2" />
                  )}
              </button>
            );
          })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

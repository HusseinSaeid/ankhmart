"use client";
import { useRef, useState, useEffect } from "react";
import { CategoryDropdown } from "./CategoryDropdown";
import { Button } from "@/components/ui/button";
import { CategoriesSideBar } from "./CategoriesSideBar";
import { cn } from "@/lib/utils";
import { VscListFilter } from "react-icons/vsc";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";

export const Categories = () => {
  const params = useParams();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setIsVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam;
  const activeCategoreIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );
  const isActiveCategoreHidden =
    activeCategoreIndex >= visibleCount && activeCategoreIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current?.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;
        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }
      setIsVisibleCount(visible);
    };
    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);
    return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">
      <CategoriesSideBar open={isSideBarOpen} onOpenChange={setIsSideBarOpen} />
      {/* hidden */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      {/* visible */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center"
      >
        <Link href={"/shop"}>
          <Button
            variant={"elevated"}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent  hover:bg-white hover:border-primary text-black",
              isActiveCategoreHidden &&
                !isAnyHovered &&
                "bg-white border-primary "
            )}
          >
            All
          </Button>
        </Link>

        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
        <div ref={viewAllRef} className=" shrink-0  ">
          <Button
            variant={"elevated"}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent  hover:bg-white hover:border-primary text-black",
              isActiveCategoreHidden &&
                !isAnyHovered &&
                "bg-white border-primary "
            )}
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            View All Categories <VscListFilter className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

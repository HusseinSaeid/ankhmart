"use client";
import { Button } from "@/components/ui/button";
import { UseProductFilters } from "../../hooks/UseProductFilters";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = UseProductFilters();
  return (
    <div>
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "default" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "default" })}
      >
        Default
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "newest" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "newest" })}
      >
        Newest
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "oldest" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "oldest" })}
      >
        Oldest
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "highest price" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "highest price" })}
      >
        Higest price
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white hover:bg-white",
          filters.sort !== "lowest price" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant={"secondary"}
        onClick={() => setFilters({ sort: "lowest price" })}
      >
        Lowest price
      </Button>
    </div>
  );
};

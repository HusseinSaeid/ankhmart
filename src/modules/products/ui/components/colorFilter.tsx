import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { TbLoader2 } from "react-icons/tb";

interface TagsFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export const ColorFilter = ({ value, onChange }: TagsFilterProps) => {
  const trps = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trps.color.getMany.infiniteQueryOptions(
        {
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );
  const onClick = (color: string) => {
    if (value?.includes(color)) {
      onChange(value?.filter((c) => c !== color) || []);
    } else {
      onChange([...(value || []), color]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <TbLoader2 className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((color) => (
            <div
              key={color.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onClick(color.name)}
            >
              <p
                style={{
                  color:
                    color.name === "white" ? "rgba(0, 0, 0, 0.5)" : color.name,
                }}
                className="font-medium capitalize"
              >
                {color.name}
              </p>
              <Checkbox
                checked={value?.includes(color.name)}
                onCheckedChange={() => onClick(color.name)}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
              />
            </div>
          ))
        )
      )}
      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="underline font-medium justify-start text-start disabled:opacity-50"
        >
          Load More .....
        </button>
      )}
    </div>
  );
};

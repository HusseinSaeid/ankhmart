import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { TbLoader2 } from "react-icons/tb";

interface TagsFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export const SizeFilter = ({ value, onChange }: TagsFilterProps) => {
  const trps = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trps.size.getMany.infiniteQueryOptions(
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
  const onClick = (size: string) => {
    if (value?.includes(size)) {
      onChange(value?.filter((s) => s !== size) || []);
    } else {
      onChange([...(value || []), size]);
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
          page.docs.map((size) => (
            <div
              key={size.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onClick(size.name)}
            >
              <p className="font-medium capitalize">{size.name}</p>
              <Checkbox
                checked={value?.includes(size.name)}
                onCheckedChange={() => onClick(size.name)}
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

import { LibraryView } from "@/modules/library/views/libraryView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async () => {
  const qurryClint = getQueryClient();
  void qurryClint.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: 20,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(qurryClint)}>
      <LibraryView />
    </HydrationBoundary>
  );
};
export default Page;

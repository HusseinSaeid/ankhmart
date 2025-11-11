import { LibraryView } from "@/modules/library/views/libraryView";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Page = async () => {
  const qurryClint = getQueryClient();
  void qurryClint.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: 20,
    })
  );
  const session = await caller.auth.session();
  if (!session.user) {
    redirect("/sign-in");
  }

  return (
    <HydrationBoundary state={dehydrate(qurryClint)}>
      <LibraryView />
    </HydrationBoundary>
  );
};
export default Page;

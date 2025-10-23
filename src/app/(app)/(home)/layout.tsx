import { Footer } from "@/modules/home/ui/components/Footer";
import { NavBar } from "@/modules/home/ui/components/NavBar";
import {
  SearchFilters,
  SearchFiltersIsLoading,
} from "@/modules/home/ui/components/search-filters/Index";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersIsLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>

      <div className="flex-1 w-full bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}

import Footer, { FooterSkeleton } from "@/modules/tenants/ui/components/footer";
import { NavBar, NavBarSkeleton } from "@/modules/tenants/ui/components/navBar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}
const Layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.tenants.getOne.queryOptions({
      slug,
    })
  );

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavBarSkeleton />}>
          <NavBar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-2xl) mx-auto">{children}</div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<FooterSkeleton />}>
          <Footer slug={slug} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};
export default Layout;

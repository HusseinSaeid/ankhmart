import { NavBar } from "@/modules/checkout/ui/components/navBar";
import { Footer } from "@/modules/home/ui/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}
const Layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <NavBar slug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-2xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
export default Layout;

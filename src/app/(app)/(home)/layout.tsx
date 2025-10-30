import { Footer } from "@/modules/home/ui/components/Footer";
import { NavBar } from "@/modules/home/ui/components/NavBar";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex-1 w-full bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}

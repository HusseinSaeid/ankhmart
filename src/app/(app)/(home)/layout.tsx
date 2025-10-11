import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}

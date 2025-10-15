import { Category } from "@/payload-types";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { SearchFilters } from "./search-filters/Index";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { CustomCategory } from "./typs";
interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: { parent: { exists: false } },
    sort: "order",
  });
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  activeCategory?: string | null;
  activeCategoryName?: string | null;
  activeSubCategoryName?: string | null;
}
export const BreadCrumbNavigation = ({
  activeCategory,
  activeCategoryName,
  activeSubCategoryName,
}: Props) => {
  if (!activeCategoryName || activeCategory === "all") return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
       <Breadcrumb>
         <BreadcrumbList>
           <BreadcrumbItem>
             <BreadcrumbLink
               asChild
               className="text-xl font-medium underline text-primary "
             >
               <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
             </BreadcrumbLink>
           </BreadcrumbItem>
           {activeSubCategoryName && (
             <>
               <BreadcrumbSeparator className="text-primary font-medium text-lg">
                 /
               </BreadcrumbSeparator>
               <BreadcrumbItem>
                 <BreadcrumbPage className="text-xl font-medium">
                   {activeSubCategoryName}
                 </BreadcrumbPage>
               </BreadcrumbItem>
             </>
           )}
         </BreadcrumbList>
       </Breadcrumb>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

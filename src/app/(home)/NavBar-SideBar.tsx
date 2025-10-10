"Use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface NavBarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavBarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavBarSideBar = ({ items, open, onOpenChange }: Props) => {
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "w-full text-left flex items-center text-base font-medium p-4 hover:bg-black hover:text-white transition-colors",
                pathname === item.href && "bg-black text-white"
              )}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              onClick={() => onOpenChange(false)}
              href={"/sign-in"}
              className="w-full hover:bg-[#4CAF50] text-left flex items-center text-base font-medium p-4 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href={"/sign-up"}
              onClick={() => onOpenChange(false)}
              className="w-full hover:bg-[#4CAF50] text-left flex items-center text-base font-medium p-4 transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

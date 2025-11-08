"Use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

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

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

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
          {session.data?.user ? (
            <div className="border-t">
              <Link
                prefetch
                onClick={() => onOpenChange(false)}
                href={"/admin"}
                className="w-full hover:bg-[#D4AF37] text-left flex items-center text-base font-medium p-4 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="border-t">
              <Link
                prefetch
                onClick={() => onOpenChange(false)}
                href={"/sign-in"}
                className="w-full hover:bg-[#D4AF37] text-left flex items-center text-base font-medium p-4 transition-colors"
              >
                Sign in
              </Link>
              <Link
                prefetch
                href={"/sign-up"}
                onClick={() => onOpenChange(false)}
                className="w-full hover:bg-[#D4AF37] text-left flex items-center text-base font-medium p-4 transition-colors"
              >
                Start Selling
              </Link>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

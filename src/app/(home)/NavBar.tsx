"use client";

import { useState } from "react";

import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavBarSideBar } from "./NavBar-SideBar";
import { BiMenu } from "react-icons/bi";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-poppins",
});

interface NavBarItemProps {
  href: string;
  children: React.ReactNode;
  isactive?: boolean;
}

const NavBarItems = [
  { children: "Home", href: "/" },
  { children: "Shop", href: "/shop" },
  { children: "About", href: "/about" },
  { children: "Contact", href: "/contact" },
];

const NavBarItem = ({ children, href, isactive }: NavBarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full border-transparent hover:border-primary px-3.5 text-lg font-medium text-gray-700 hover:text-primary",
        isactive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export const NavBar = () => {
  const pathname = usePathname();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <nav className=" h-20 flex border-b justify-between bg-white font-medium ">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Logo
        </span>
      </Link>
      <NavBarSideBar
        items={NavBarItems}
        open={isSideBarOpen}
        onOpenChange={setIsSideBarOpen}
      />
      <div className="lg:flex hidden items-center gap-4 ">
        {NavBarItems.map((item) => (
          <NavBarItem
            key={item.href}
            href={item.href}
            isactive={pathname === item.href}
          >
            {item.children}
          </NavBarItem>
        ))}
      </div>
      <div className="hidden lg:flex">
        <Button
          asChild
          variant="secondary"
          className={cn(
            "border-t-0 border-b-0 border-r-0 border-l px-12 h-full rounded-none bg-white hover:bg-[#4CAF50] transition-colors text-lg"
          )}
        >
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button
          asChild
          className={cn(
            "border-t-0 border-b-0 border-r-0 border-l px-12 h-full rounded-none bg-black hover:bg-[#4CAF50] transition-colors text-lg hover:text-black"
          )}
        >
          <Link href="/sign-up">Start Selling</Link>
        </Button>
      </div>
      <div className="lg:hidden flex items-center justify-center">
        <Button
          variant="ghost"
          className="border-transparent bg-white"
          onClick={() => setIsSideBarOpen(true)}
        >
          <BiMenu />
        </Button>
      </div>
    </nav>
  );
};

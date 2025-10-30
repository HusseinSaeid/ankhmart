import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="h-14 border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex gap-2 items-center h-full px-4 lg:px-12 ">
        <p className="text-xl">Powered by</p>
        <Link href={"/"}>
          <span className="text-2xl font-semibold">AnkhMart</span>
        </Link>
      </div>
    </footer>
  );
};
export default Footer;

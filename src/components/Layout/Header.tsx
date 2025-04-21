import Link from "next/link";
import { Logo } from "@/components";
import { BreadcrumbNav } from "./BreadCrumbNav";

export async function Header() {
  return (
    <header className="w-full h-[72px] px-4 py-2 border-b items-center bg-zinc-900 hidden md:flex">
      <Link
        href="/"
        className="text-xl font-semibold tracking-tight mr-6 flex items-center"
        aria-label="Home"
      >
        <div role="img" aria-label="Github Logo - Cat Silhouette">
          <Logo className="w-full h-full " />
        </div>
      </Link>

      <BreadcrumbNav />
    </header>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  pathname: string;
}

export function BreadcrumbNav({ pathname }: BreadcrumbProps) {
  const crumbs = pathname.split("/").filter(Boolean);
  const paths = crumbs.map(
    (_, idx) => "/" + crumbs.slice(0, idx + 1).join("/")
  );

  if (crumbs.length === 0) {
    return (
      <span className="text-white font-normal flex justify-center items-center gap-4">
        <span className="text-2xl">/</span>
        <span className="text-base font-light">Explorer</span>
      </span>
    );
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-sm text-muted-foreground"
    >
      {paths.map((path, idx) => {
        const crumbName = crumbs[idx];
        const isLast = idx === paths.length - 1;

        return (
          <span key={path} className="flex items-center">
            <span className="mx-1 text-zinc-400">/</span>
            {isLast ? (
              <span
                className="text-zinc-900 dark:text-white capitalize flex items-center"
                aria-current="page"
              >
                {crumbName}
              </span>
            ) : (
              <Link
                href={path}
                className={cn("hover:underline flex items-center capitalize")}
              >
                {crumbName}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

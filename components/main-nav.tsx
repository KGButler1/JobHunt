"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, BuildingIcon } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link href="/" className="text-xl font-bold">
            JobHub
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/jobs"
            className={cn(
              "flex items-center space-x-2 transition-colors hover:text-foreground/80",
              pathname === "/jobs" ? "text-foreground" : "text-foreground/60"
            )}
          >
            <BriefcaseIcon className="h-4 w-4" />
            <span>Jobs</span>
          </Link>
          <Link
            href="/companies"
            className={cn(
              "flex items-center space-x-2 transition-colors hover:text-foreground/80",
              pathname === "/companies" ? "text-foreground" : "text-foreground/60"
            )}
          >
            <BuildingIcon className="h-4 w-4" />
            <span>Companies</span>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline">Sign In</Button>
          <Button>Post a Job</Button>
        </div>
      </div>
    </header>
  );
}
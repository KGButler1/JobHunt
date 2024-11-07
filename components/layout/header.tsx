"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BriefcaseIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BriefcaseIcon className="h-6 w-6" />
            <span className="text-xl font-bold">JobHub</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 ml-6">
            <Link href="/jobs" className="text-sm font-medium hover:text-primary">
              Browse Jobs
            </Link>
            <Link href="/companies" className="text-sm font-medium hover:text-primary">
              Companies
            </Link>
            <Link href="/salary" className="text-sm font-medium hover:text-primary">
              Salary Guide
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Quick search..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">Post a Job</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
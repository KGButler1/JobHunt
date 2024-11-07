"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";
import FeaturedJobs from "@/components/home/featured-jobs";
import RecentSearches from "@/components/home/recent-searches";
import PopularCategories from "@/components/home/popular-categories";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append("q", keyword);
    if (location) params.append("location", location);
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover thousands of job opportunities with all the information you need. Its your future.
          </p>
          
          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="relative md:col-span-5">
                <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Job title or keyword"
                  className="pl-10"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="relative md:col-span-4">
                <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <Button className="w-full" onClick={handleSearch}>
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
          
          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["Remote", "Software Engineer", "Marketing", "Design", "Sales"].map((term) => (
              <Button 
                key={term} 
                variant="link" 
                className="text-sm"
                onClick={() => {
                  setKeyword(term);
                  handleSearch();
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container">
          <FeaturedJobs />
        </div>
      </section>

      {/* Recent Searches & Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <RecentSearches />
            <PopularCategories />
          </div>
        </div>
      </section>
    </>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchIcon, ClockIcon, XIcon } from "lucide-react";

const recentSearches = [
  {
    id: 1,
    query: "Frontend Developer in San Francisco",
    filters: ["Full-time", "Remote"],
    date: "2 days ago"
  },
  {
    id: 2,
    query: "UX Designer",
    filters: ["Contract", "New York"],
    date: "3 days ago"
  },
  {
    id: 3,
    query: "Software Engineer",
    filters: ["Full-time", "Remote"],
    date: "5 days ago"
  }
];

export default function RecentSearches() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <ClockIcon className="h-5 w-5" />
          Recent Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSearches.map((search) => (
            <div
              key={search.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-start gap-3">
                <SearchIcon className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">{search.query}</p>
                  <div className="flex gap-2 mt-1">
                    {search.filters.map((filter) => (
                      <span
                        key={filter}
                        className="text-xs text-muted-foreground bg-background px-2 py-1 rounded"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{search.date}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
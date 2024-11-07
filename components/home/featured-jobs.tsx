"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, MapPinIcon, BriefcaseIcon, DollarSignIcon } from "lucide-react";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop&auto=format",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
    logo: "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?w=128&h=128&fit=crop&auto=format",
    tags: ["Figma", "UI/UX", "Design Systems"],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $160k",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=128&h=128&fit=crop&auto=format",
    tags: ["AWS", "Kubernetes", "CI/CD"],
  },
];

export default function FeaturedJobs() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Jobs</h2>
        <Button variant="outline">View All Jobs</Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPinIcon className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <BriefcaseIcon className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground col-span-2">
                      <DollarSignIcon className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeftIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  jobTypes, 
  experienceLevels, 
  industries, 
  salaryRanges 
} from "@/lib/data/job-filters";

interface JobFiltersProps {
  filters: {
    type: string[];
    experience: string[];
    industry: string[];
    salary: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    type: string[];
    experience: string[];
    industry: string[];
    salary: string[];
  }>>;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function JobFilters({ filters, setFilters, isCollapsed, onToggleCollapse }: JobFiltersProps) {
  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      experience: [],
      industry: [],
      salary: []
    });
  };

  if (isCollapsed) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleCollapse}
        className="w-full mb-4"
      >
        <ChevronLeftIcon className="h-4 w-4 rotate-180" />
        <span className="ml-2">Show Filters</span>
      </Button>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-primary"
        >
          Clear all
        </Button>
      </div>

      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["type", "experience", "industry", "salary"]}
      >
        <AccordionItem value="type">
          <AccordionTrigger>Job Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.type.includes(type)}
                    onCheckedChange={() => handleFilterChange("type", type)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exp-${level}`}
                    checked={filters.experience.includes(level)}
                    onCheckedChange={() => handleFilterChange("experience", level)}
                  />
                  <label
                    htmlFor={`exp-${level}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="industry">
          <AccordionTrigger>Industry</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={filters.industry.includes(industry)}
                    onCheckedChange={() => handleFilterChange("industry", industry)}
                  />
                  <label
                    htmlFor={`industry-${industry}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {industry}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="salary">
          <AccordionTrigger>Salary Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {salaryRanges.map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox
                    id={`salary-${range}`}
                    checked={filters.salary.includes(range)}
                    onCheckedChange={() => handleFilterChange("salary", range)}
                  />
                  <label
                    htmlFor={`salary-${range}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {range}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
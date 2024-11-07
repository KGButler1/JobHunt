"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Job } from "@/lib/types";
import { 
  BookmarkIcon,
  ClipboardListIcon,
  MapPinIcon,
  CalendarIcon,
  BriefcaseIcon,
  DollarSignIcon,
  EyeIcon,
  StickyNoteIcon
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { JobDetailsModal } from "./job-details-modal";

interface JobCardProps {
  job: Job;
  viewMode?: 'grid' | 'list';
  isSaved?: boolean;
  isTodo?: boolean;
  hasNote?: boolean;
  onSave?: (jobId: number) => void;
  onTodo?: (jobId: number) => void;
  onSaveNote?: (jobId: number, note: string) => void;
  savedNote?: string;
  className?: string;
}

export function JobCard({
  job,
  viewMode = 'grid',
  isSaved = false,
  isTodo = false,
  hasNote = false,
  onSave,
  onTodo,
  onSaveNote,
  savedNote = "",
  className
}: JobCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!job) return null;

  const {
    id,
    title = '',
    company = { name: '', logo: '' },
    location = '',
    type = '',
    salary = '',
    postedDate = '',
    skills = []
  } = job;

  const companyInitial = company.name ? company.name.charAt(0).toUpperCase() : '';

  return (
    <>
      <Card
        className={cn(
          "relative group transition-all duration-200",
          viewMode === 'list' ? "p-4" : "p-6",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 border">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={company.name} 
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-primary/10 text-primary font-semibold">
                {companyInitial}
              </div>
            )}
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{company.name}</p>
              </div>
              
              <div className="flex gap-2">
                {hasNote && (
                  <div className="text-yellow-500">
                    <StickyNoteIcon className="h-4 w-4" />
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onSave?.(id)}
                  title={isSaved ? "Remove from saved" : "Save job"}
                >
                  <BookmarkIcon 
                    className={cn(
                      "h-4 w-4",
                      isSaved && "fill-current"
                    )} 
                  />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onTodo?.(id)}
                  title={isTodo ? "Remove from todo" : "Add to todo"}
                >
                  <ClipboardListIcon 
                    className={cn(
                      "h-4 w-4",
                      isTodo && "fill-current"
                    )} 
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowDetails(true)}
                  title="View details"
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <BriefcaseIcon className="h-3 w-3" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSignIcon className="h-3 w-3" />
                <span>{salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{postedDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <Badge 
                  key={`${skill}-${index}`}
                  variant="secondary" 
                  className="text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <JobDetailsModal
        job={job}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onSaveNote={onSaveNote!}
        savedNote={savedNote}
      />
    </>
  );
}
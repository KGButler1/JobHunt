"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  CalendarIcon,
} from "lucide-react";
import { Job } from "@/lib/types";
import { Avatar } from "@/components/ui/avatar";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveNote: (jobId: number, note: string) => void;
  savedNote?: string;
}

export function JobDetailsModal({
  job,
  isOpen,
  onClose,
  onSaveNote,
  savedNote = "",
}: JobDetailsModalProps) {
  const [note, setNote] = useState(savedNote);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    setNote(savedNote);
  }, [savedNote]);

  if (!job || !job.company) return null;

  const handleSaveNote = () => {
    onSaveNote(job.id, note);
  };

  const companyInitial = job.company.name ? job.company.name.charAt(0).toUpperCase() : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border">
              {job.company.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-primary/10 text-primary font-semibold">
                  {companyInitial}
                </div>
              )}
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl mb-1">{job.title}</DialogTitle>
              <DialogDescription className="text-base">
                {job.company.name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="details"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              Notes
              {note && <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">•</Badge>}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="details" className="mt-4 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPinIcon className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BriefcaseIcon className="h-4 w-4" />
                  {job.type}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSignIcon className="h-4 w-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  Posted {job.postedDate}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, index) => (
                    <Badge key={`${skill}-${index}`} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {job.description || "No description available."}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">About the Company</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {job.company.description || "No company description available."}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Add your notes about this job..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button onClick={handleSaveNote}>Save Note</Button>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
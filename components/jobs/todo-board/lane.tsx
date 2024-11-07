"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TodoLane } from "@/lib/data/todo-lanes";
import { Job } from "@/lib/types";
import { JobCard } from "../job-card";

interface TodoLaneProps {
  lane: TodoLane;
  jobs: Job[];
  savedJobs: number[];
  todoJobs: number[];
  isEditing: boolean;
  onSave: (jobId: number) => void;
  onTodo: (jobId: number) => void;
  onTitleChange: (laneId: string, newTitle: string) => void;
  onRemove: (laneId: string) => void;
  isDraggingJob: boolean;
}

export function TodoLaneComponent({
  lane,
  jobs,
  savedJobs,
  todoJobs,
  isEditing,
  onSave,
  onTodo,
  onTitleChange,
  onRemove,
  isDraggingJob
}: TodoLaneProps) {
  const { setNodeRef } = useDroppable({
    id: lane.id,
    data: { type: 'LANE', accepts: ['JOB'] }
  });

  const laneJobs = jobs.filter(job => lane.jobIds.includes(job.id));

  return (
    <div className="flex-shrink-0 w-80 bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <Input
            autoFocus
            defaultValue={lane.title}
            onBlur={(e) => onTitleChange(lane.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onTitleChange(lane.id, e.currentTarget.value);
              }
            }}
          />
        ) : (
          <div
            className={cn(
              "font-semibold",
              lane.editable && "cursor-pointer hover:text-primary"
            )}
          >
            {lane.title}
          </div>
        )}
        {lane.editable && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(lane.id)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "space-y-4 min-h-[200px] transition-colors rounded-lg p-2",
          isDraggingJob && "bg-muted/50 border-2 border-dashed border-primary/50"
        )}
      >
        <SortableContext
          items={laneJobs.map(job => job.id)}
          strategy={verticalListSortingStrategy}
        >
          {laneJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              viewMode="list"
              isSaved={savedJobs.includes(job.id)}
              isTodo={todoJobs.includes(job.id)}
              onSave={() => onSave(job.id)}
              onTodo={() => onTodo(job.id)}
              className="transform transition-transform hover:scale-102"
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
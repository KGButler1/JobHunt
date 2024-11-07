"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Job } from "@/lib/types";
import { JobCard } from "./job-card";
import { GripVertical, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TodoLaneProps {
  lane: {
    id: string;
    title: string;
    jobIds: number[];
  };
  index: number;
  jobs: Job[];
  savedJobs: number[];
  todoJobs: number[];
  onSave: (jobId: number) => void;
  onTodo: (jobId: number) => void;
  onUpdate: (updates: Partial<typeof TodoLaneProps.prototype.lane>) => void;
  onRemove: () => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

export function TodoLane({
  lane,
  index,
  jobs,
  savedJobs,
  todoJobs,
  onSave,
  onTodo,
  onUpdate,
  onRemove,
  onMove,
}: TodoLaneProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lane.id,
    data: {
      type: "Lane",
      lane,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[200px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 flex-1">
          <button {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-500" />
          </button>
          
          {isEditing ? (
            <Input
              value={lane.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
              autoFocus
              className="h-7 py-1"
            />
          ) : (
            <h3
              onClick={() => setIsEditing(true)}
              className="font-medium text-sm cursor-pointer"
            >
              {lane.title}
            </h3>
          )}
        </div>
        
        <button
          onClick={onRemove}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {jobs.map((job) => (
          <JobCard
            key={`${lane.id}-${job.id}`}
            job={job}
            isSaved={savedJobs.includes(job.id)}
            isTodo={todoJobs.includes(job.id)}
            onSave={onSave}
            onTodo={onTodo}
          />
        ))}
      </div>
    </div>
  );
}
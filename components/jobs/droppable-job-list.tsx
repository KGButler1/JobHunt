"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { DraggableJobCard } from "./draggable-job-card";
import { Job } from "@/lib/types";

interface DroppableJobListProps {
  id: string;
  jobs: Job[];
  viewMode: "grid" | "list";
  savedJobs: number[];
  todoJobs: number[];
  jobNotes: { [key: number]: string };
  onSave: (jobId: number) => void;
  onTodo: (jobId: number) => void;
  onSaveNote: (jobId: number, note: string) => void;
}

export function DroppableJobList({
  id,
  jobs,
  viewMode,
  savedJobs,
  todoJobs,
  jobNotes,
  onSave,
  onTodo,
  onSaveNote,
}: DroppableJobListProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={jobs} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        className={`grid gap-4 ${
          viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {jobs.map((job) => (
          <DraggableJobCard
            key={job.id}
            job={job}
            viewMode={viewMode}
            isSaved={savedJobs.includes(job.id)}
            isTodo={todoJobs.includes(job.id)}
            hasNote={Boolean(jobNotes[job.id])}
            savedNote={jobNotes[job.id]}
            onSave={() => onSave(job.id)}
            onTodo={() => onTodo(job.id)}
            onSaveNote={onSaveNote}
          />
        ))}
      </div>
    </SortableContext>
  );
}
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { JobCard } from "./job-card";

interface DraggableJobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    logo: string;
    tags: readonly string[];
    description: string;
  };
  viewMode: "grid" | "list";
  isSaved: boolean;
  isTodo: boolean;
  onSave: () => void;
  onTodo: () => void;
}

export function DraggableJobCard({ job, viewMode, isSaved, isTodo, onSave, onTodo }: DraggableJobCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <JobCard
        job={job}
        viewMode={viewMode}
        isSaved={isSaved}
        isTodo={isTodo}
        onSave={onSave}
        onTodo={onTodo}
      />
    </div>
  );
}
"use client";

import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TodoLaneComponent } from "./lane";
import { useTodoBoard } from "@/lib/hooks/use-todo-board";
import { Job } from "@/lib/types";
import { TodoLane } from "@/lib/data/todo-lanes";
import { DragOverlay } from "@dnd-kit/core";
import { JobCard } from "../job-card";

interface TodoBoardProps {
  lanes: TodoLane[];
  jobs: Job[];
  savedJobs: number[];
  todoJobs: number[];
  onSave: (jobId: number) => void;
  onTodo: (jobId: number) => void;
  onUpdateLanes: (lanes: TodoLane[]) => void;
}

export function TodoBoard({
  lanes: initialLanes,
  jobs,
  savedJobs,
  todoJobs,
  onSave,
  onTodo,
  onUpdateLanes
}: TodoBoardProps) {
  const {
    lanes,
    activeJobId,
    editingLaneId,
    setActiveJobId,
    setEditingLaneId,
    addLane,
    removeLane,
    updateLaneTitle,
    moveJobToLane,
    reorderLanes
  } = useTodoBoard(initialLanes);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveJobId(event.active.id as number);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id as number;
    const targetLaneId = over.id as string;

    moveJobToLane(jobId, targetLaneId);
    onUpdateLanes(lanes);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveJobId(null);
    onUpdateLanes(lanes);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        <SortableContext
          items={lanes.map(lane => lane.id)}
          strategy={horizontalListSortingStrategy}
        >
          {lanes.map((lane) => (
            <TodoLaneComponent
              key={lane.id}
              lane={lane}
              jobs={jobs}
              savedJobs={savedJobs}
              todoJobs={todoJobs}
              isEditing={editingLaneId === lane.id}
              onSave={onSave}
              onTodo={onTodo}
              onTitleChange={updateLaneTitle}
              onRemove={removeLane}
              isDraggingJob={activeJobId !== null}
            />
          ))}
        </SortableContext>

        <Button
          variant="outline"
          className="flex-shrink-0 w-80 h-[300px]"
          onClick={addLane}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Lane
        </Button>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <DragOverlay>
          {activeJobId && (
            <JobCard
              job={jobs.find(j => j.id === activeJobId)!}
              viewMode="list"
              isSaved={savedJobs.includes(activeJobId)}
              isTodo={todoJobs.includes(activeJobId)}
              onSave={() => {}}
              onTodo={() => {}}
              className="opacity-80"
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
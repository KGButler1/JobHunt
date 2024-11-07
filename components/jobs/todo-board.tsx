"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { TodoLane } from "./todo-lane";
import { Job } from "@/lib/types";
import { generateId } from "@/lib/utils";

interface TodoBoardProps {
  lanes: Array<{
    id: string;
    title: string;
    jobIds: number[];
  }>;
  jobs: Job[];
  savedJobs: number[];
  todoJobs: number[];
  onSave: (jobId: number) => void;
  onTodo: (jobId: number) => void;
  onUpdateLanes: (lanes: any) => void;
}

export function TodoBoard({
  lanes,
  jobs,
  savedJobs,
  todoJobs,
  onSave,
  onTodo,
  onUpdateLanes,
}: TodoBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeJobId = parseInt(active.id.toString());
    const overLaneId = over.id.toString();

    // Find the source and destination lanes
    const sourceLane = lanes.find(lane => 
      lane.jobIds.includes(activeJobId)
    );
    const destLane = lanes.find(lane => 
      lane.id === overLaneId
    );

    if (!sourceLane || !destLane || sourceLane.id === destLane.id) return;

    onUpdateLanes(lanes.map(lane => {
      if (lane.id === sourceLane.id) {
        return {
          ...lane,
          jobIds: lane.jobIds.filter(id => id !== activeJobId)
        };
      }
      if (lane.id === destLane.id) {
        return {
          ...lane,
          jobIds: [...lane.jobIds, activeJobId]
        };
      }
      return lane;
    }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  const handleAddLane = () => {
    const newLane = {
      id: generateId(),
      title: "New Lane",
      jobIds: []
    };
    onUpdateLanes([...lanes, newLane]);
  };

  const handleUpdateLane = (laneId: string, updates: Partial<typeof lanes[0]>) => {
    onUpdateLanes(
      lanes.map(lane => 
        lane.id === laneId ? { ...lane, ...updates } : lane
      )
    );
  };

  const handleRemoveLane = (laneId: string) => {
    onUpdateLanes(lanes.filter(lane => lane.id !== laneId));
  };

  const handleMoveLane = (fromIndex: number, toIndex: number) => {
    onUpdateLanes(arrayMove(lanes, fromIndex, toIndex));
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button
            onClick={handleAddLane}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Lane
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SortableContext items={lanes.map(lane => lane.id)}>
            {lanes.map((lane, index) => (
              <TodoLane
                key={lane.id}
                index={index}
                lane={lane}
                jobs={jobs.filter(job => lane.jobIds.includes(job.id))}
                savedJobs={savedJobs}
                todoJobs={todoJobs}
                onSave={onSave}
                onTodo={onTodo}
                onUpdate={(updates) => handleUpdateLane(lane.id, updates)}
                onRemove={() => handleRemoveLane(lane.id)}
                onMove={handleMoveLane}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
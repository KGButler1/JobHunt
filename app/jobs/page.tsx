"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ListIcon, LayoutGridIcon } from "lucide-react";
import { TodoBoard } from "@/components/jobs/todo-board";
import { SearchForm } from "@/components/jobs/search-form";
import { JobFilters } from "@/components/jobs/job-filters";
import { DroppableJobList } from "@/components/jobs/droppable-job-list";
import { defaultTodoLanes } from "@/lib/data/todo-lanes";
import { jobs } from "@/lib/data/jobs";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

interface JobNotes {
  [key: number]: string;
}

export default function JobsPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [todoLanes, setTodoLanes] = useState(defaultTodoLanes);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [todoJobs, setTodoJobs] = useState<number[]>([]);
  const [jobNotes, setJobNotes] = useState<JobNotes>({});
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    type: [],
    experience: [],
    industry: [],
    salary: []
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleSearch = (keyword: string, location: string) => {
    // Implement search logic here
    console.log("Searching:", { keyword, location });
  };

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleTodoJob = (jobId: number) => {
    setTodoJobs(prev => {
      const newTodoJobs = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];

      // Update lanes when adding/removing from todo
      setTodoLanes(currentLanes => {
        if (prev.includes(jobId)) {
          // Remove job from all lanes
          return currentLanes.map(lane => ({
            ...lane,
            jobIds: lane.jobIds.filter(id => id !== jobId)
          }));
        } else {
          // Add job to "Not Started" lane
          return currentLanes.map(lane => {
            if (lane.id === 'not-started') {
              return {
                ...lane,
                jobIds: [...lane.jobIds, jobId]
              };
            }
            return lane;
          });
        }
      });

      return newTodoJobs;
    });
  };

  const handleSaveNote = (jobId: number, note: string) => {
    setJobNotes(prev => ({
      ...prev,
      [jobId]: note
    }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    if (over.id === "saved") {
      handleSaveJob(active.id as number);
    } else if (over.id === "todo") {
      handleTodoJob(active.id as number);
    }
  };

  return (
    <div className="container py-8">
      <SearchForm
        initialKeyword={searchParams.get("q") || ""}
        initialLocation={searchParams.get("location") || ""}
        onSearch={handleSearch}
      />

      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className={isFilterCollapsed ? "col-span-1" : "col-span-12 md:col-span-3"}>
          <JobFilters 
            filters={filters} 
            setFilters={setFilters}
            isCollapsed={isFilterCollapsed}
            onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
          />
        </div>

        <div className={`col-span-12 ${isFilterCollapsed ? "md:col-span-11" : "md:col-span-9"}`}>
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <Tabs defaultValue="search" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="search">Search Results</TabsTrigger>
                  <TabsTrigger value="saved">
                    Saved ({savedJobs.length})
                  </TabsTrigger>
                  <TabsTrigger value="todo">
                    Todo Board ({todoJobs.length})
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="search" className="mt-6">
                <DroppableJobList
                  id="search"
                  jobs={jobs}
                  viewMode={viewMode}
                  savedJobs={savedJobs}
                  todoJobs={todoJobs}
                  jobNotes={jobNotes}
                  onSave={handleSaveJob}
                  onTodo={handleTodoJob}
                  onSaveNote={handleSaveNote}
                />
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                <DroppableJobList
                  id="saved"
                  jobs={jobs.filter(job => savedJobs.includes(job.id))}
                  viewMode={viewMode}
                  savedJobs={savedJobs}
                  todoJobs={todoJobs}
                  jobNotes={jobNotes}
                  onSave={handleSaveJob}
                  onTodo={handleTodoJob}
                  onSaveNote={handleSaveNote}
                />
              </TabsContent>

              <TabsContent value="todo" className="mt-6">
                <TodoBoard
                  lanes={todoLanes}
                  jobs={jobs}
                  savedJobs={savedJobs}
                  todoJobs={todoJobs}
                  jobNotes={jobNotes}
                  onSave={handleSaveJob}
                  onTodo={handleTodoJob}
                  onSaveNote={handleSaveNote}
                  onUpdateLanes={setTodoLanes}
                />
              </TabsContent>
            </Tabs>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
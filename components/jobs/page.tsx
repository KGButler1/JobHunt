"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListIcon, LayoutGridIcon } from "lucide-react";
import { jobs } from "@/lib/data/jobs";
import { SearchForm } from "@/components/jobs/search-form";
import { JobFilters } from "@/components/jobs/job-filters";
import { DroppableJobList } from "@/components/jobs/droppable-job-list";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { JobCard } from "@/components/jobs/job-card";

export default function JobsPage() {
  // ... existing state declarations ...
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // ... existing sensor setup and handlers ...

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (!over) return;

    // Handle reordering within lists if needed
    if (active.id !== over.id) {
      // Implement reordering logic here if desired
    }
  };

  return (
    <div className="container py-8">
      <SearchForm
        initialKeyword={keyword}
        initialLocation={location}
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
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Jobs</TabsTrigger>
                  <TabsTrigger 
                    value="saved" 
                    id="saved"
                    className={`relative ${activeId && activeTab !== "saved" ? "after:content-[''] after:absolute after:inset-0 after:border-2 after:border-dashed after:border-primary after:rounded-md after:animate-pulse" : ""}`}
                  >
                    Saved ({savedJobs.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="todo" 
                    id="todo"
                    className={`relative ${activeId && activeTab !== "todo" ? "after:content-[''] after:absolute after:inset-0 after:border-2 after:border-dashed after:border-primary after:rounded-md after:animate-pulse" : ""}`}
                  >
                    To-Do ({todoJobs.length})
                  </TabsTrigger>
                </TabsList>

                <TooltipProvider>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="icon"
                          onClick={() => setViewMode("grid")}
                        >
                          <LayoutGridIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Grid view</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="icon"
                          onClick={() => setViewMode("list")}
                        >
                          <ListIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>List view</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>

              <TabsContent value="all">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DroppableJobList
                      id="all"
                      jobs={filteredJobs}
                      viewMode={viewMode}
                      savedJobs={savedJobs}
                      todoJobs={todoJobs}
                      onSave={toggleSaveJob}
                      onTodo={toggleTodoJob}
                    />
                  </motion.div>
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="saved">
                <DroppableJobList
                  id="saved"
                  jobs={filteredJobs.filter(job => savedJobs.includes(job.id))}
                  viewMode={viewMode}
                  savedJobs={savedJobs}
                  todoJobs={todoJobs}
                  onSave={toggleSaveJob}
                  onTodo={toggleTodoJob}
                />
              </TabsContent>

              <TabsContent value="todo">
                <DroppableJobList
                  id="todo"
                  jobs={filteredJobs.filter(job => todoJobs.includes(job.id))}
                  viewMode={viewMode}
                  savedJobs={savedJobs}
                  todoJobs={todoJobs}
                  onSave={toggleSaveJob}
                  onTodo={toggleTodoJob}
                />
              </TabsContent>
            </Tabs>

            <DragOverlay>
              {activeId ? (
                <div className="opacity-80">
                  <JobCard
                    job={jobs.find(job => job.id === activeId)!}
                    viewMode={viewMode}
                    isSaved={savedJobs.includes(activeId)}
                    isTodo={todoJobs.includes(activeId)}
                    onSave={() => {}}
                    onTodo={() => {}}
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
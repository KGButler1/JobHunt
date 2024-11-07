"use client";

import { useState } from 'react';
import { TodoLane } from '@/lib/data/todo-lanes';
import { Job } from '@/lib/types';

export function useTodoBoard(initialLanes: TodoLane[]) {
  const [lanes, setLanes] = useState(initialLanes);
  const [activeJobId, setActiveJobId] = useState<number | null>(null);
  const [editingLaneId, setEditingLaneId] = useState<string | null>(null);

  const addLane = () => {
    const newLane: TodoLane = {
      id: `lane-${Date.now()}`,
      title: "New Lane",
      jobIds: [],
      editable: true,
      order: lanes.length
    };
    setLanes([...lanes, newLane]);
    setEditingLaneId(newLane.id);
  };

  const removeLane = (laneId: string) => {
    const laneToRemove = lanes.find(lane => lane.id === laneId);
    if (!laneToRemove?.editable) return;
    setLanes(lanes.filter(lane => lane.id !== laneId));
  };

  const updateLaneTitle = (laneId: string, newTitle: string) => {
    const laneToUpdate = lanes.find(lane => lane.id === laneId);
    if (!laneToUpdate?.editable) return;

    setLanes(lanes.map(lane => 
      lane.id === laneId ? { ...lane, title: newTitle } : lane
    ));
    setEditingLaneId(null);
  };

  const moveJobToLane = (jobId: number, targetLaneId: string) => {
    setLanes(prevLanes => {
      // Remove job from all lanes first
      const lanesWithoutJob = prevLanes.map(lane => ({
        ...lane,
        jobIds: lane.jobIds.filter(id => id !== jobId)
      }));

      // Add job to target lane
      return lanesWithoutJob.map(lane =>
        lane.id === targetLaneId
          ? { ...lane, jobIds: [...lane.jobIds, jobId] }
          : lane
      );
    });
  };

  const reorderLanes = (sourceIndex: number, destinationIndex: number) => {
    setLanes(prevLanes => {
      const newLanes = [...prevLanes];
      const [removed] = newLanes.splice(sourceIndex, 1);
      newLanes.splice(destinationIndex, 0, removed);
      return newLanes.map((lane, index) => ({ ...lane, order: index }));
    });
  };

  return {
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
  };
}
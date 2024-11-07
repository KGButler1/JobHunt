export interface TodoLane {
  id: string;
  title: string;
  jobIds: number[];
  editable: boolean;
  order: number;
}

export const defaultTodoLanes: TodoLane[] = [
  {
    id: 'not-started',
    title: 'Not Started',
    jobIds: [],
    editable: false,
    order: 0
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    jobIds: [],
    editable: false,
    order: 1
  },
  {
    id: 'follow-up',
    title: 'Follow Up',
    jobIds: [],
    editable: false,
    order: 2
  },
  {
    id: 'closed',
    title: 'Closed',
    jobIds: [],
    editable: false,
    order: 3
  }
];
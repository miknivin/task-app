export enum TaskStatus {
  Completed = 'completed',
  Pending = 'pending',
  Active = 'active',
}

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  date: string;
  time: string;
  description: string;
}

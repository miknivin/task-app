import { Injectable, EventEmitter } from '@angular/core';
import { Task } from './../models/taskModel';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';
  taskUpdated = new EventEmitter<void>(); // EventEmitter for task updates

  constructor() {}

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
    this.taskUpdated.emit();
  }

  deleteTask(taskId: number): void {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    this.saveTasks(tasks);
    this.taskUpdated.emit();
  }

  editTask(updatedTask: Task): void {
    let tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
      this.taskUpdated.emit();
    }
  }

  getTaskById(taskId: number): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find((task) => task.id === taskId);
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task-service.service';
import { Task, TaskStatus } from '../models/taskModel';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../dialogs/edit-task-dialog/edit-task-dialog.component';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.css'],
})
export class ActiveTasksComponent implements OnInit {
  activeTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    public editTaskDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadActiveTasks();
    this.taskService.taskUpdated.subscribe(() => {
      this.getActiveTasks();
    });
  }

  getActiveTasks(): void {
    const allTasks = this.taskService.getTasks();
    this.activeTasks = allTasks.filter((task) => task.status === 'active');
  }

  loadActiveTasks(): void {
    const allTasks = this.taskService.getTasks();

    this.activeTasks = allTasks.filter((task) => {
      if (task.status === TaskStatus.Completed) {
        return false;
      } else {
        const taskDate = new Date(task.date);
        const today = new Date();
        console.log(taskDate);

        if (taskDate >= today) {
          task.status = TaskStatus.Active;
        } else {
          task.status = TaskStatus.Pending;
        }
        this.taskService.editTask(task);
        return task.status === TaskStatus.Active;
      }
    });
  }
  //Edit task dialog
  openDialog(taskId?: number): void {
    const dialogRef = this.editTaskDialog.open(EditTaskDialogComponent, {
      width: 'auto',
      data: { taskId: taskId },
    });
  }
  //delete confirm dialog
  openConfirmDialog(taskId?: number): void {
    const dialogRef = this.editTaskDialog.open(DeleteConfirmDialogComponent, {
      width: 'auto',
      data: { taskId: taskId },
    });
  }

  markAsComplete(taskId: number): void {
    const task = this.taskService.getTaskById(taskId);
    if (task) {
      if (task.status === TaskStatus.Completed) {
        const taskDateTime = new Date(task.date + ' ' + task.time);
        const today = new Date();
        if (taskDateTime < today) {
          task.status = TaskStatus.Pending;
        } else {
          task.status = TaskStatus.Active;
        }
      } else {
        task.status = TaskStatus.Completed;
      }
      this.taskService.editTask(task);

      setTimeout(() => {
        this.getActiveTasks();
      }, 1000);
    }
  }
}

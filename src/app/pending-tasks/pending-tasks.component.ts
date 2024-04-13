import { Component } from '@angular/core';
import { EditTaskDialogComponent } from '../dialogs/edit-task-dialog/edit-task-dialog.component';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { TaskService } from '../services/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskStatus } from '../models/taskModel';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css'],
})
export class PendingTasksComponent {
  pendingTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    public editTaskDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getPendingTasks();
    this.taskService.taskUpdated.subscribe(() => {
      this.getPendingTasks();
    });
  }

  getPendingTasks(): void {
    const allTasks = this.taskService.getTasks();
    this.pendingTasks = allTasks.filter((task) => task.status === 'pending');
  }

  openDialog(taskId?: number): void {
    const dialogRef = this.editTaskDialog.open(EditTaskDialogComponent, {
      width: 'auto',
      data: { taskId: taskId }, // Pass taskId as data to the dialog
    });
  }

  openConfirmDialog(taskId?: number): void {
    const dialogRef = this.editTaskDialog.open(DeleteConfirmDialogComponent, {
      width: 'auto',
      data: { taskId: taskId }, // Pass taskId as data to the dialog
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
        this.getPendingTasks();
      }, 1000);
    }
  }
}

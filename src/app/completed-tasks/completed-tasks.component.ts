import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskStatus } from '../models/taskModel';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { EditTaskDialogComponent } from '../dialogs/edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css'],
})
export class CompletedTasksComponent implements OnInit {
  completedTasks: Task[] = [];
  constructor(
    private taskService: TaskService,
    public editTaskDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getCompletedTasks();
    this.taskService.taskUpdated.subscribe(() => {
      this.getCompletedTasks();
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

  getCompletedTasks(): void {
    const allTasks = this.taskService.getTasks();
    this.completedTasks = allTasks.filter(
      (task) => task.status === 'completed',
    );
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
      //setTimeOut for user experiance
      setTimeout(() => {
        this.getCompletedTasks();
      }, 1000);
    }
  }
}

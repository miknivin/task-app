import { Component } from '@angular/core';
import { TaskService } from '../services/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Task, TaskStatus } from '../models/taskModel';
import { EditTaskDialogComponent } from '../dialogs/edit-task-dialog/edit-task-dialog.component';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent {
  allTasks: Task[] = [];
  constructor(
    private taskService: TaskService,
    public editTaskDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
    this.taskService.taskUpdated.subscribe(() => {
      this.getAllTasks();
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

  getAllTasks(): void {
    this.allTasks = this.taskService.getTasks();
  }

  markAsComplete(taskId: number): void {
    const task = this.taskService.getTaskById(taskId);
    if (task) {
      if (task.status === TaskStatus.Completed) {
        //check if status
        const taskDateTime = new Date(task.date + ' ' + task.time);
        const today = new Date();
        if (taskDateTime <= today) {
          task.status = TaskStatus.Pending;
        } else {
          task.status = TaskStatus.Active;
        }
      } else {
        task.status = TaskStatus.Completed;
      }
      this.taskService.editTask(task);

      setTimeout(() => {
        this.getAllTasks();
      }, 1000);
    }
  }
}

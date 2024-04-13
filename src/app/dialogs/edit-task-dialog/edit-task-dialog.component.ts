import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/taskModel';
import { DateFilterFn } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
  task!: Task;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private taskService: TaskService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.taskId) {
      const task = this.taskService.getTaskById(this.data.taskId);
      if (task) {
        this.task = task;
        // console.log(this.task);
      } else {
        console.error('Task not found with ID:', this.data.taskId);
        this.dialogRef.close();
        this.openSnackBar('Task not found');
      }
    }
  }

  editTask(taskForm: NgForm): void {
    if (taskForm.invalid) {
      return;
    }

    const { taskName, dueDate, dueTime, description } = taskForm.value;

    // Update task properties
    this.task.name = taskName;
    this.task.date = dueDate;
    this.task.time = dueTime;
    this.task.description = description;

    // Call the editTask method from the task service to update the task
    this.taskService.editTask(this.task);

    // Display success message
    this.openSnackBar('Task updated successfully');

    // Close the dialog
    this.dialogRef.close();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000, // Duration in milliseconds
    });
  }

  dateFilter: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) {
      return false; // Disable null date (if needed)
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  dateSelected(event: any): void {
    if (event && event.value instanceof Date) {
      console.log('Selected date:', event.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

import { Task, TaskStatus } from './../../models/taskModel';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task-service.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DateFilterFn,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
})
export class AddTaskDialogComponent {
  @Output() dialogClosed = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
  ) {}

  addTask(taskForm: NgForm) {
    if (taskForm.invalid) {
      return;
    }

    const { taskName, dueDate, dueTime, description } = taskForm.value;

    // Create a new task object
    const newTask: Task = {
      id: this.generateUniqueId(),
      name: taskName,
      status: TaskStatus.Active, // Set default status to Pending
      date: dueDate,
      time: dueTime,
      description: description,
    };

    // Calling the addTask method from the task service to add the task
    this.taskService.addTask(newTask);
    this.openSnackBar('Task added successfully');
    this.taskService.taskUpdated.emit();
    this.dialogRef.close();
  }

  dateSelected(event: any): void {
    if (event && event.value instanceof Date) {
      console.log('Selected date:', event.value);
    }
  }

  generateUniqueId(): number {
    const id = Math.floor(1000 + Math.random() * 9000);
    return id;
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
}

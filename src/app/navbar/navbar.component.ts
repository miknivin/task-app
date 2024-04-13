import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../dialogs/add-task-dialog/add-task-dialog.component';
import { TaskService } from '../services/task-service.service';
import { Task } from '../models/taskModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  pendingTasksToday: Task[] = [];
  constructor(public addTaskDialog: MatDialog, private taskService: TaskService) {}
  ngOnInit(): void {
    this.getPendingTasksToday()
    console.log(this.pendingTasksToday);

  }

  openDialog(): void {
    const dialogRef = this.addTaskDialog.open(AddTaskDialogComponent, {
      width: 'auto',
    });
  }

  getPendingTasksToday(): void {
    const allTasks = this.taskService.getTasks();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to beginning of the day for accurate comparison

    this.pendingTasksToday = allTasks.filter((task) => {
        // Check if task is pending and its date matches today's date
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0); // Set hours to beginning of the day for accurate comparison
        return task.status === 'pending' && taskDate.getTime() === today.getTime();
    });
}


}

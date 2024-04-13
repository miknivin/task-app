import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css'],
})
export class DeleteConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private taskService: TaskService,
    private snackBar: MatSnackBar,
  ) {}

  deleteTask(): void {
    if (this.data && this.data.taskId) {
      this.taskService.deleteTask(this.data.taskId);
      this.openSnackBar('Task deleted successfully');
      this.dialogRef.close();
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000, // Duration in milliseconds
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

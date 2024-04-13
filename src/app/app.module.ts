import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TaskLayoutComponent } from './task-layout/task-layout.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActiveTasksComponent } from './active-tasks/active-tasks.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './dialogs/add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from './dialogs/edit-task-dialog/edit-task-dialog.component';
import { DeleteConfirmDialogComponent } from './dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    AllTasksComponent,
    NavbarComponent,
    FooterComponent,
    TaskLayoutComponent,
    ActiveTasksComponent,
    PendingTasksComponent,
    AddTaskDialogComponent,
    EditTaskDialogComponent,
    DeleteConfirmDialogComponent,
    CompletedTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

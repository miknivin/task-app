import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskLayoutComponent } from './task-layout/task-layout.component';

const routes: Routes = [
  {
    path: 'task-layout',
    component: TaskLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

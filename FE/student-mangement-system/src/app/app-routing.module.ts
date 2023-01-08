import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {StudentGridComponent} from "./student-grid/student-grid.component";

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
    path:'students', component: StudentGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

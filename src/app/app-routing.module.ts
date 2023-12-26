import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminComponent } from './hrDashboard/admin/admin.component';
import { EmployeeComponent } from './EmployeeDashboard/employee/employee.component';
import { HrDashboardComponent } from './hrDashboard/hr-dashboard/hr-dashboard.component';
import { EmployeeDetailsComponent } from './hrDashboard/employee-details/employee-details.component';
import { CreateEmployeeComponent } from './hrDashboard/create-employee/create-employee.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'Login',
    component: LoginPageComponent
  },
  {
    path: 'Admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'hrdashboard',
        component: HrDashboardComponent
      },
      {
        path: 'employeeList',
        component: EmployeeDetailsComponent
      },
      {
        path: 'createEmployee',
        component: CreateEmployeeComponent
      }
    ]
  },
  {
    path: 'Employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

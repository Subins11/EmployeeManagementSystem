import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsPageComponent } from './EmployeeDashboard/details-page/details-page.component';
import { LeaveApplicationPageComponent } from './EmployeeDashboard/leave-application-page/leave-application-page.component';
import { EmployeeDetailsComponent } from './hrDashboard/employee-details/employee-details.component';
import { HrDashboardComponent } from './hrDashboard/hr-dashboard/hr-dashboard.component';
import { CreateEmployeeComponent } from './hrDashboard/create-employee/create-employee.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './hrDashboard/admin/admin.component';
import { EmployeeComponent } from './EmployeeDashboard/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './charts/charts.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DetailsPageComponent,
    LeaveApplicationPageComponent,
    EmployeeDetailsComponent,
    HrDashboardComponent,
    CreateEmployeeComponent,
    LoginPageComponent,
    LandingPageComponent,
    AdminComponent,
    EmployeeComponent,
    ChartsComponent,
    DoughnutChartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

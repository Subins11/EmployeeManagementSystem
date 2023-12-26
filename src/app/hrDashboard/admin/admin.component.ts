import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  hrdashboard: boolean = false;
  employeeList: boolean = false;
  createEmployee: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.showDashboard();
  }

//Setting the value false to the Component

  setoff() {
    this.hrdashboard = false;
    this.employeeList = false;
    this.createEmployee = false;
  }

//To display the Dashboard on Click

  showDashboard() {
    this.setoff();
    this.hrdashboard = true;
  }

//To display the Details Page on Click

  showDetails() {
    this.setoff();
    this.employeeList = true;
  }

//To display the Add employee Page on Click

  addEmployee() {
    this.setoff();
    this.createEmployee = true;
  }

//Logout function

  logout(): void {
    console.log('Logging off...');
    this.authService.logout();
    this.cdr.detectChanges();
    window.location.reload();
  }
}
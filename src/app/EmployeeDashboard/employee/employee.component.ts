import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  employeeDetails : boolean = false;
  Leave: boolean = false;

  constructor (private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.showEmployee();
  }

  // Setting the value false to the Component

  setoff() {
    this.employeeDetails = false;
    this.Leave =false;
  }

// To display the Employee Details Pages

  showEmployee() {
    this.setoff();
    this.employeeDetails = true
  }

  // Tp display the Levae leaveApplication

  leaveApplication() {
    this.setoff();
    this.Leave = true
  }

//Logout Function

  logout(): void {
    console.log('Logging off...');
    this.authService.logout();
    this.cdr.detectChanges();
    window.location.reload();
  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveRequest } from 'src/app/models/leave-request.model';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss'],
})
export class HrDashboardComponent implements OnInit {


  leaveRequests: LeaveRequest[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadLeaveRequest();
  }

//Leave List

loadLeaveRequest() {
  this.employeeService.getLeaveRequests().subscribe((data: LeaveRequest[]) => {
    this.leaveRequests = data;
  });
}

//  Leave Approval

  approveLeave(request: LeaveRequest) {
    this.employeeService.approveLeaveRequest(request.id).subscribe(() => {
      this.loadLeaveRequest();
    });
  }

// Leave Rejection

  rejectLeave(request: LeaveRequest) {
    this.employeeService.rejectLeaveRequest(request.id).subscribe(() => {
      this.loadLeaveRequest();
    });
  }
}
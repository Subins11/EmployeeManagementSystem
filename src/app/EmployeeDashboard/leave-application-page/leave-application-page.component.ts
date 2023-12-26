import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-leave-application-page',
  templateUrl: './leave-application-page.component.html',
  styleUrls: ['./leave-application-page.component.scss']
})
export class LeaveApplicationPageComponent {

leaveRequest:FormGroup = this.fb.group({

  fullName: ["", Validators. required],
  leaveType: ["", Validators. required],
  startDate: ["", Validators. required],
  endDate: ["", Validators. required],
  reason: ["", Validators.required]

})

constructor ( private fb: FormBuilder, private employeeService : EmployeeService  ) {}

// Request Submission

onSubmit() {
  const formData = this.leaveRequest.value;
  this.employeeService.submitLeaveRequest(formData).subscribe(() => {
    console.log('Leave request submitted successfully.');
    this.leaveRequest.reset();
  });
}
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { Employee } from "src/app/models/employee.model";
import Swal from "sweetalert2";
import { LeaveRequest } from '../../models/leave-request.model';
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

leaveRequests: LeaveRequest[] = [];
employees: Employee[] = [];
selectedEmployee: any;
isEditing: boolean = false;
  editForm : FormGroup = this.fb.group({
    image:['', Validators.required],
    fullName: ['', Validators.required],
    jobRole: ['', Validators.required],
    age: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
  });

  constructor(private adminService: AdminService, private fb: FormBuilder,private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadLeaveRequest();
    this.adminService.getEmployees().subscribe((data: Employee[]) => {
      console.log('All employees:', data);
    
      this.employees = data;
      this.selectedEmployee = this.employees.find((employee) => employee.id === 1); //Employee Details of ID 1
      console.log('Selected employee:', this.selectedEmployee);

      if (this.selectedEmployee) {

       // Populate the edit form with the details of the selected employee
       
        this.editForm.setValue({
          image: this.selectedEmployee.image,
          fullName: this.selectedEmployee.fullName,
          jobRole: this.selectedEmployee.jobRole,
          age: this.selectedEmployee.age,
          dateOfBirth: this.selectedEmployee.dateOfBirth,
          bloodGroup: this.selectedEmployee.bloodGroup,
          gender: this.selectedEmployee.gender,
          email: this.selectedEmployee.email,
          mobile: this.selectedEmployee.mobile,
        });
      }
    });
  }

  
//To display the Leave Request List

  loadLeaveRequest() {
    this.employeeService.getLeaveRequests().subscribe((data: any) => {
      this.leaveRequests = data;
    });
  }

  //Edit Function

  editEmployee(employee : any): void {
    this.selectedEmployee = {...employee};
    this.isEditing= true;

    this.editForm.setValue({
      fullName: this.selectedEmployee.fullName,
      jobRole: this.selectedEmployee.jobRole,
      age:  this.selectedEmployee.age,
      dateOfBirth: this.selectedEmployee.dateOfBirth,
      image: this.selectedEmployee.image,
      bloodGroup : this.selectedEmployee.bloodGroup,
      gender: this.selectedEmployee.gender,
      email : this.selectedEmployee.email,
      mobile:this.selectedEmployee.mobile
    })
  }

//Updating the new Data


  updateEmployee(): void {
    this.selectedEmployee = 
    { ...this.selectedEmployee, ...this.editForm.value}
    this.adminService.updateEmployee(this.selectedEmployee).subscribe(() => {
      const index = this.employees.findIndex((e) => e.id === this.selectedEmployee.id);
      if (index !== -1) {
        this.employees[index] = {...this.selectedEmployee};
      }
      this.cancelEdit();
      window.location.reload();
    });
  }


//Cancel Edit

  cancelEdit(): void {
    this.selectedEmployee = {};
    this.isEditing = false;
  }
}

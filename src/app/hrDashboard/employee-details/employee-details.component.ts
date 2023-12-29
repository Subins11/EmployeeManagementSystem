import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Employee } from 'src/app/models/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  employees: Employee[] = [];
  
  selectedEmployee: any;

  isEditing: boolean = false;

  editForm: FormGroup = this.fb.group({
    image: ['', Validators.required],
    fullName: ['', Validators.required],
    jobRole: ['', Validators.required],
    age: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    bloodGroup: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
  });
  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.adminService.getEmployees().subscribe((data: any) => {
      this.employees = data;
    });
  }

  // Delete Function

  deleteEmployee(employeeId: number): void {
    this.adminService.deleteEmployee(employeeId.toString()).subscribe(() => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5f1f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.employees = this.employees.filter(
            (employee) => employee.id !== employeeId
          );
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      });
    });
  }

  // Edit Function

  editEmployee(employee: any): void {
    this.selectedEmployee = { ...employee };
    this.isEditing = true;

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

  // Update

  updateEmployee(): void {
    this.selectedEmployee = {
      ...this.selectedEmployee,
      ...this.editForm.value,
    };
    this.adminService.updateEmployee(this.selectedEmployee).subscribe(() => {
      const index = this.employees.findIndex(
        (e) => e.id === this.selectedEmployee.id
      );
      if (index !== -1) {
        this.employees[index] = { ...this.selectedEmployee };
      }
      this.cancelEdit();
    });
  }

  // Cancel Edit

  cancelEdit(): void {
    this.selectedEmployee = {};
    this.isEditing = false;
  }

  // Setting Employee Status

  setStatus(employee: Employee): void {
    const newStatus = !employee.status;
    this.adminService
      .employeeStatus(employee.id, newStatus)
      .subscribe((updatedEmployee) => {
        employee.status = updatedEmployee.status;
      });
  }
}

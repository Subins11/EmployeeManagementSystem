import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

   employeeForm: FormGroup;

constructor(private fb: FormBuilder, private adminService: AdminService) {
  
  this.employeeForm = this.fb.group({
    image:["", Validators.required],
    fullName: ["", Validators.required],
    jobRole: ["", Validators.required],
    age: ["", Validators.required],
    dateOfBirth: ["", Validators.required],
    bloodGroup: ["", Validators.required],
    gender: ["", Validators.required],
    email: ["", Validators.required],
    mobile: ["", Validators.required],
  });
}

// Creating Employee List

  onSubmit() {
    const formData = this.employeeForm.value;
    this.adminService.createEmployee(formData);
    console.log(formData);
    this.employeeForm.reset();
    Swal.fire({
      position: "center",
      icon: "success",
      color:"#ff5f1f",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }

}
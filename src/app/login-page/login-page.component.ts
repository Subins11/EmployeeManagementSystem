import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

//Login Function

  login(): void {
    if (this.loginForm && this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      console.log('Attempting to log in:', username, password);

      if (this.authService.login(username, password)) {
        console.log('Login successful');
        if (this.authService.isAdminUser()) {
          this.router.navigate(['/Admin/hrdashboard']);
        } else {
          this.router.navigate(['/Employee']);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter a Valid Credential",
        });
        console.log('Login failed');
      }
    }
  }
}
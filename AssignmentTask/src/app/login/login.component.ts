import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,RouterOutlet,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
//   status = 'ONLINE'; 
// isConnected! :boolean;
internetAvailable: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private userservice:UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkInternetConnection();
  }
  checkInternetConnection() {
    this.internetAvailable = navigator.onLine;
    window.addEventListener('online', () => this.updateInternetStatus());
    window.addEventListener('offline', () => this.updateInternetStatus());
  }
  updateInternetStatus() {
    this.internetAvailable = navigator.onLine;
  }
  

  get email()
  {
    return this.loginForm.get('email');
  }
  get password()
  {
    return this.loginForm.get('password');
  }

  // login() {
  //   if (this.loginForm.valid) {
  //     // Add your authentication logic here (e.g., API call to check credentials)
  //     // alert('Login successful');
  //     this.router.navigate(['/homepage']);
  //   } else {
  //     alert('Please fill in all fields with valid data.');
  //   }
  // }

  validateUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const result = this.userservice.validateUser(email, password);

      if (result) {
        localStorage.setItem('useremail', email);
        this.router.navigate(['/homepage']); 
      } else {
        alert('Login Failed');
      }
    } else {
      alert('Please fill in the required fields with valid data.');
    }
  }


  // goToHomePage() {
  //   this.router.navigate(['/homepage']);
  // }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

}

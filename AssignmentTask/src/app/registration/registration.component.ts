import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterOutlet],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  internetAvailable: boolean = false;

  constructor(private formBuilder: FormBuilder,private userservice:UserService,private router: Router) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
    });  
  }
  // { validators: this.passwordMatchValidator }

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

  get firstName()
  {
    return this.registrationForm.get('firstName');
  }
  get lastName()
  {
    return this.registrationForm.get('lastName');
  }
  get email()
  {
    return this.registrationForm.get('email');
  }
  get mobile()
  {
    return this.registrationForm.get('mobile');
  }
  get password()
  {
    return this.registrationForm.get('password');
  }
  get confirmPassword()
  {
    return this.registrationForm.get('confirmPassword');
  }
  // passwordMatchValidator(formGroup: FormGroup) {

  //   if(this.password===this.confirmPassword)
  //   {
  //     // this.userService.addUsers(this.user);
  //   alert('Register Successful....');
  //   }
  //   const password = formGroup.get('password').value;
  //   const confirmPassword = formGroup.get('confirmPassword').value;
  //   return password === confirmPassword ? null : { mismatch: true };
  // }

  addUser() {
    // if (this.registrationForm.valid&&this.password?.value===this.confirmPassword?.value) {
    //   // Save details to local storage (you may want to use a service to handle this)
    //   localStorage.setItem('userDetails', JSON.stringify(this.registrationForm.value));
    //   alert('Details saved successfully');
    // } else {
    //   alert('Please fill in all fields with valid data.');
    // }

    if (this.registrationForm.valid && this.password?.value === this.confirmPassword?.value) {
      const {  email, password } = this.registrationForm.value;
  
      // Save user to local storage
      this.userservice.addUser({ email, password });
  
      alert('Registration Successful');
      this.router.navigate(['/login']);
    } else {
      alert('Please fill in the required fields with valid data, and make sure passwords match.');
    }
  }
}

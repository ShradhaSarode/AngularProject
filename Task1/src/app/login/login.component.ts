import { Component, OnInit, inject } from '@angular/core';
import { Task1Service } from '../task1.service';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from './loginDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isInvalidCredentials:boolean=false;

  loginservice:Task1Service=inject(Task1Service);
  login:Login={};
  queryValue: string | unknown;
  userList:any=[];
  isUpdatebtn!: boolean;
  loginForm!:FormGroup;

  constructor(private fb: FormBuilder,
    private loginService:Task1Service,
     private router: Router,
      private route: ActivatedRoute)
  {}
 
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.maxLength(8)]]
    });
    this.isUpdatebtn = false;
    // read the query parameter value using paramMap obervable
    this.route.paramMap.subscribe(x => {
      this.queryValue = x.get('id');
    })
    if (this.queryValue != '' && this.queryValue !=null) {
      alert(this.queryValue);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  



  
  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

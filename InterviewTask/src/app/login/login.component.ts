import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './loginDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isInvalidCredentials:boolean=false;

  loginservice:LoginService=inject(LoginService);
  login:Login={};
  queryValue: string | unknown;
  userList:any=[];
  isUpdatebtn!: boolean;
  loginForm!:FormGroup;

  constructor(private fb: FormBuilder,private loginService:LoginService, private router: Router, private route: ActivatedRoute)
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
  // getLogin()
  // {
  //   this.loginService.getLogin().subscribe(result => {
  //     this.userList = result;
  //     console.log(this.userList);
  //   })
  // }



  createProject() {
    
    const credential=this.loginForm.value;
    this.loginService.login(credential).subscribe(matchingUser=>{
     
      if(matchingUser)
      {
        this.router.navigate(['/project']);
      }
      else 
      {
        // alert('Invalid credentials. Please try again.');
        this.isInvalidCredentials = true;
      }
    },error=>{
      console.error(error);
      alert('An error occurred.Please try again.');
    }
);
  }
  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

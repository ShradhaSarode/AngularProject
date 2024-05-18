import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarServiceService } from '../car-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  isInvalidCredentials:boolean=false;

  loginservice:CarServiceService=inject(CarServiceService);
  // login:Login={};
  queryValue: string | unknown;
  userList:any=[];
  isUpdatebtn!: boolean;
  loginForm!:FormGroup;

  constructor(private fb: FormBuilder,private loginService:CarServiceService, private router: Router, private route: ActivatedRoute)
  {}
 
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userid:[],
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
  login() {
    // this.router.navigate(['/index']);
    const credential=this.loginForm.value;
    this.loginService.login(credential).subscribe(matchingUser=>{
      sessionStorage.setItem("userid",matchingUser.userid);
    
      if(matchingUser.roleid==roles.admin)
      {
        this.router.navigate(['/cars']);
      }
      else if(matchingUser.roleid==roles.user)
      {
        // alert('Invalid credentials. Please try again.');
        this.router.navigate(['/index']);
      }
      else{
        this.isInvalidCredentials = true;
      }
    },error=>{
      console.error(error);
      alert('An error occurred.Please try again.');
    }
);
  }

  getUserid()
  {
    const data=this.loginForm.value;
    
    this.loginService.getUserid(data).subscribe(matchResult=>{
      console.log(data);
      sessionStorage.setItem("userid",data.userid);
      
      this.router.navigate(['/booking']);   
    },
    error =>{
      console.error(error);
      alert('Error Occurred');
    }
  );
  sessionStorage['reset'];
  }

  goToLogin()
  {
    this.router.navigate(['/login']);
  }
  goToRegister()
  {
    this.router.navigate(['/register']);
  }
  goToLogout()
  {
    this.router.navigate(['/index']);
  }
}
export enum roles {

  admin=1,user=2
}
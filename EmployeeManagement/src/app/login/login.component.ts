import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../management.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule,RouterOutlet,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isInvalidCredentials:boolean=false;
  queryValue: string | unknown;
  userList:any=[];
  isUpdatebtn!: boolean;
  loginForm!:FormGroup;

  constructor(private fb: FormBuilder,
    private loginService:ManagementService, 
    private router: Router, 
    private route: ActivatedRoute)
  {}
 
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userid:[],
      email: ['', [Validators.required,Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['',[Validators.required,Validators.maxLength(8)]]
    });
    this.isUpdatebtn = false;
    // read the query parameter value using paramMap obervable
    this.route.paramMap.subscribe((x: { get: (arg0: string) => unknown; }) => {
      this.queryValue = x.get('id');
    })
    if (this.queryValue != '' && this.queryValue !=null) {
      alert(this.queryValue);
    }
  }
  get userid() {
    return this.loginForm.get('userid');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  login() {
    const credentials = this.loginForm.value; 
    this.loginService.login(credentials).subscribe( 
      matchingUser => { 
        console.log(matchingUser); 
        
        if(matchingUser){ 
           
          if (matchingUser.rid === 1) {  
            this.router.navigate(['/employee']);
          } else if (matchingUser.rid === 2) { 
            this.router.navigate(['/dashboard']);
          }
          //this.router.navigate(['/employee'])
        } 
        else  
        { 
          this.isInvalidCredentials = true; 
        } 
      }, 
      error => { 
        console.error(error);   
        this.isInvalidCredentials = true; 
      } 
    ); 
  }

  getUserid()
  {
    const data=this.loginForm.value;
    
    this.loginService.getUserid(data).subscribe(matchResult=>{
      console.log(data);
      sessionStorage.setItem("userid",data.userid);
      
      this.router.navigate(['/']);   
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
  getForgetModal()
  {
    this.router.navigate(['/forgetpassword']);
  }
}
export enum roles {

  admin=1,user=2
}


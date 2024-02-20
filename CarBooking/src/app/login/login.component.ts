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
  gotosearch() {
    this.router.navigate(['/index']);
//     const credential=this.loginForm.value;
//     this.loginService.login(credential).subscribe(matchingUser=>{
     
//       if(matchingUser)
//       {
//         this.router.navigate(['/index']);
//       }
//       else 
//       {
//         // alert('Invalid credentials. Please try again.');
//         this.isInvalidCredentials = true;
//       }
//     },error=>{
//       console.error(error);
//       alert('An error occurred.Please try again.');
//     }
// );
  }

}

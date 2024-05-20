import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit
{
  queryValue: string | unknown;
userList:any=[];
isUpdatebtn!: boolean;
registerForm!:FormGroup;

constructor(private fb: FormBuilder, 
  private router: Router, 
  private route: ActivatedRoute,
  private regService:ManagementService)
{}


ngOnInit(): void {
  this.registerForm = this.fb.group({
    userid:[],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.maxLength(8)]],
    confirmpassword: ['',[Validators.required,Validators.maxLength(8)]]
    // roleid:["2"]
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
  return this.registerForm.get('email');
}
get password() {
  return this.registerForm.get('password');
}
get confirmpassword() {
  return this.registerForm.get('confirmpassword');
}

getUser() {
  this.regService.getUser().subscribe(result => {
    this.userList = result;
    console.log(this.userList);
  })
}


// save & update product
saveUser() {
  let user = this.registerForm.value;
  this.regService.saveUser(user).subscribe(result => {});
  // this.getUser();
  this.registerForm.reset();
  this.router.navigate(['/login']);
  
}

goToLogin()
{
  this.router.navigate(['/login']);
}
goToRegister()
{
  this.router.navigate(['/register']);
}

}

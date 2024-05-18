import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Task1Service } from '../task1.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
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
   private regService:Task1Service)
{}


ngOnInit(): void {
  this.registerForm = this.fb.group({
    userid:[],
    name:['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contact: [,[Validators.required,Validators.maxLength(10)]],
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
get name() {
  return this.registerForm.get('name');
}
get email() {
  return this.registerForm.get('email');
}
get contact() {
  return this.registerForm.get('contact');
}
get password() {
  return this.registerForm.get('password');
}
get confirmpassword() {
  return this.registerForm.get('confirmpassword');
}

// getUser() {
//   this.regService.getUser().subscribe(result => {
//     this.userList = result;
//     console.log(this.userList);
//   })
// }


// save & update product
// saveUser() {
//   let user = this.registerForm.value;
//   this.regService.saveUser(user).subscribe(result => {});
//   // this.getUser();
//   this.registerForm.reset();
//   this.router.navigate(['/login']);
  
// }

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
  this.router.navigate(['/login']);
}

}

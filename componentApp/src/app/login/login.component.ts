import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Users } from '../usersDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailId:string="";
  password:string="";
  addLogin()
  {
    console.log("Email id: "+this.emailId+"\nPassword: "+this.password);
  }

  userServise:UsersService=inject(UsersService);
  user:Users={};
  email:any='';
  constructor(private router:Router)
  {

  }
  validateUser()
  {
    this.email=this.user.email;
    let result=this.userServise.validateUser(this.user);
    if(result==true)
    {
      localStorage.setItem('useremail',this.email);
      this.router.navigate(['/employee']);
      //alert('Login Succssful');
    }
    else{
      alert('Login Fail');
    }
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Users } from '../usersDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email:string="";
  uName:string="";
  password:string="";
  confirmPass:string="";
  userService:UsersService=inject(UsersService);
  user:Users={};
  constructor(private router:Router)
  {

  }
  addUser()
  {
    //console.log("Email id: "+this.email+"\nUser Name: "+this.uName+"\nPassword: "+this.password+"\nConfirm Password: "+this.confirmPass);
    
    if(this.user.password==this.user.confirmPass)
    {
      this.userService.addUsers(this.user);
    alert('Register Successful....');
    this.router.navigate(['/login']);
    }
    else{
      alert('Register failed....');
    }
  }


}

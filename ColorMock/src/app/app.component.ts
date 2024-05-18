import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Users } from './UserDTO';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ColorMock';
  names: string[] = [];
  selectedColor: string | null = null;
  
  addColor(name: string): void {
    if (name.trim()) {
      this.names.push(name);
    }
  }
  changeBackgroundColor(color: string): void {
    document.body.style.backgroundColor = color.toLowerCase();
  }
  changeTextColor(color: string): void {
    this.selectedColor = color;
  }
  email:string="";
  uName:string="";
  password:string="";
  confirmPass:string="";
  userService:UserService=inject(UserService);
  user:Users={};
  constructor(private router:Router)
  {

  }
  addUser()
  {
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

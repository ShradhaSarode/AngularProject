import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
}

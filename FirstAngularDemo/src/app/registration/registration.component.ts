import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  email:string="";
  uName:string="";
  password:string="";
  confirmPass:string="";
  addUser()
  {
    console.log("Email id: "+this.email+"\nUser Name: "+this.uName+"\nPassword: "+this.password+"\nConfirm Password: "+this.confirmPass);
  }

}

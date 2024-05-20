import { CommonModule } from '@angular/common';
import { Component, OnInit, VERSION } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {
  email: string = '';
  captcha: string = '';
  generatedCaptcha: string = '';
  captchaLength: number = 6;
  captchaCharacters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPWRSTUVWXYZ0123456789@#$%&*';
  

  constructor(
    private httpservice: ManagementService,
    public dialogRef: MatDialogRef<ForgetpasswordComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  verifyEmail(): void {
    if (!this.email) {
      this.showToast('info', 'Email is Required');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@thinkquotient\.com$/;
    if (!emailRegex.test(this.email)) {
      this.showToast('info', 'Invalid email');
      return;
    }

    const request = { email: this.email };
    this.httpservice.postRequest(request).subscribe(
      data => {
        if (data.STATUS) {
          this.checkCaptchaValue();
        } else {
          this.showToast('warning', 'This email does not exist');
        }
      },
      error => {
        this.showToast('error', 'Something went wrong');
      }
    );
  }

  navigateToForgetPassword(): void {
    const request = { email: this.email };
    this.httpservice.postRequest(request).subscribe(
      data => {
        if (data.STATUS) {
          this.showToast('success', data.MSG);
          this.dialogRef.close();
        } else {
          this.showToast('warning', 'This email does not exist');
        }
        this.generateCaptcha();
      },
      error => {
        this.showToast('error', 'Something went wrong');
        this.generateCaptcha();
      }
    );
  }

  generateCaptcha(): void {
    this.generatedCaptcha = '';
    for (let i = 0; i < this.captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * this.captchaCharacters.length);
      this.generatedCaptcha += this.captchaCharacters[randomIndex];
    }
  }

  checkCaptchaValue(): void {
    if (this.captcha === this.generatedCaptcha) {
      this.navigateToForgetPassword();
    } else {
      this.showToast('warning', 'Invalid captcha');
      this.clearCaptcha();
      this.generateCaptcha();
    }
  }

  clearCaptcha(): void {
    this.captcha = '';
  }

  showToast(icon: any, title: string): void {
    Toast.fire({
      icon: icon,
      title: title,
    });
  }

}





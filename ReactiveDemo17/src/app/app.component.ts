import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ReactiveDemo17';
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.userForm.get('notification')?.valueChanges.subscribe(changeValue => {
      const phoneNo = this.userForm.get('phoneNo');
      if (changeValue) {
        this.phoneNo?.setValidators(Validators.required);
      }
      else {
        this.phoneNo?.clearValidators();
      }


      // update the change in the userform
      phoneNo?.updateValueAndValidity();
    });
  }

  myForm = this.fb.group({
    name: new FormControl(''),
    email: new FormControl(''),
    city: new FormControl('')
  })
  addData() {
    console.log(this.myForm.value);
  }
  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNo: [''],
    notification: [true]
  });
  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phoneNo() {
    return this.userForm.get('phoneNo');
  }
  get notification() {
    return this.userForm.get('notificaion');
  }
}

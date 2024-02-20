import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit { 
  title = 'ReactiveForm_CRUD'; 
 empForm!:FormGroup; 
   
 
   
  isUpdatebtn: boolean = false; 
  empList: any = []; 
 
  constructor(private empService: EmployeeService, private fb: FormBuilder) { } 
 
  ngOnInit(): void { 
    this.getAllEmployees(); 
    this.isUpdatebtn = false; 
    this.empForm = this.fb.group({ 
      id: [, Validators.required], 
      name: ['', Validators.required], 
      salary: [, Validators.required] 
    }); 
  } 
 
  get id() { 
    return this.empForm.get('id'); 
  } 
 
  get name() { 
    return this.empForm.get('name'); 
  } 
 
  get salary() { 
    return this.empForm.get('salary'); 
  } 
  getAllEmployees() { 
    this.empList = this.empService.getAllEmployees(); 
  } 
 
  edit(emp: any) { 
    this.isUpdatebtn = true; 
    this.empForm.setValue({ 
      id: emp.id, 
      name: emp.name, 
      salary: emp.salary 
    }); 
  } 
 
  deleteEmployee(id: number | undefined) { 
    let response = confirm('Do you want to delete id ' + id + ' ?'); 
    if (response == true) { 
      this.empService.deleteEmployee(id); 
      this.getEmployees(); 
    } 
  } 
 
  clearForm() { 
    this.empForm.reset(); 
    this.isUpdatebtn = false; 
  } 
 
  getEmployees() { 
    this.empList = this.empService.getAllEmployees(); 
  } 
   
 
  saveEmployee() { 
  let emp=this.empForm.value; 
  if(!this.isUpdatebtn){ 
    this.empService.addEmployee(emp); 
  } 
 else{ 
    this.empService.updateEmployee(emp); 
    this.isUpdatebtn=false; 
   //this.empForm.get('id')?.enable(); 
 } 
 this.empForm.reset(); 
 this.getAllEmployees(); 
} 
}
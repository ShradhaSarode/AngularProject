import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterOutlet],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit { 
  title = 'Student_CRUD'; 
 studForm!:FormGroup;   
  isUpdatebtn: boolean = false; 
  studList: any = []; 
  queryValue: string | unknown;
 
  constructor(private studService: StudentService, private fb: FormBuilder,private route:ActivatedRoute,private router:Router) { } 
 
  ngOnInit(): void { 
    this.getAllStudents(); 
    this.isUpdatebtn = false; 
    this.studForm = this.fb.group({ 
      id: [, Validators.required], 
      name: ['', Validators.required], 
      subject1: [, Validators.required] ,
      subject2: [, Validators.required] ,
      subject3: [, Validators.required] 
    }); 

   
  } 
 
  get id() { 
    return this.studForm.get('id'); 
  } 
 
  get name() { 
    return this.studForm.get('name'); 
  } 
 
  get subject1()
  {
    return this.studForm.get('subject1');
  }

  get subject2()
  {
    return this.studForm.get('subject2');
  }

  get subject3()
  {
    return this.studForm.get('subject3');
  }
   
  getStudents()
  {
    this.studList = this.studService.getAllStudents(); 
  }

  getAllStudents() { 
    this.studList = this.studService.getAllStudents(); 
  } 
 
  edit(stud: any) { 
    this.isUpdatebtn = true; 
    this.studForm.setValue({ 
      id: stud.id, 
      name: stud.name, 
      subject1:stud.subject1,
      subject2:stud.subject2,
      subject3:stud.subject3
      
    }); 
  } 
 
  deleteStudent(id: number | undefined) { 
    let response = confirm('Do you want to delete id ' + id + ' ?'); 
    if (response == true) { 
      this.studService.deleteStudent(id); 
      this.getAllStudents(); 
    } 
  } 
 
  clearForm() { 
    this.studForm.reset(); 
    this.isUpdatebtn = false; 
  } 
 
  // getStudent() { 
  //   this.studList = this.studService.getAllStudents(); 
  // } 
   
 
  saveStudent() { 
  let stud=this.studForm.value; 
  if(!this.isUpdatebtn){ 
    this.studService.addStudent(stud); 
  } 
 else{ 
    this.studService.updateStudent(stud); 
    this.isUpdatebtn=false; 
   //this.empForm.get('id')?.enable(); 
 } 
 this.studForm.reset(); 
 this.getAllStudents(); 
}
displayResult(id:number)
{
  this.router.navigate(['/marks',id])
}
}

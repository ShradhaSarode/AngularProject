import { Injectable } from '@angular/core';
import { Student } from './studentDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentList: Student[] = []; 
  private id: number = 100; 
  //studentServise:StudentService;
 
  constructor() { 
    this.studentList.push({ id: 100, name: "Shradha" ,subject1:85,subject2:90,subject3:95}); 
  } 
 
  generateStudentId(): number { 
    this.id++; 
    return this.id; 
  } 

 

  public getAllStudents(): Student[] { 
    return this.studentList; 
  } 
 
  public getStudentById(id: number):Student|any { 
   return this.studentList.find(Student=>Student.id==id)
  } 
 
  public addStudent(stud: Student): void { 
    stud.id = this.generateStudentId(); 
    this.studentList.push({ id: stud.id, name: stud.name,subject1:stud.subject1,subject2:stud.subject2,subject3:stud.subject3}); 
  } 
 
  public updateStudent(stud: Student): void { 
    for (let i = 0; i < this.studentList.length; i++) { 
      if (this.studentList[i].id === stud.id) { 
        this.studentList[i].name = stud.name;
        this.studentList[i].subject1 = stud.subject1;
        this.studentList[i].subject2 = stud.subject2;
        this.studentList[i].subject3 = stud.subject3; 
       
        break; 
      } 
    } 
  } 
 
  public deleteStudent(id: number | undefined) { 
    let i = 0; 
    for (; i < this.studentList.length; i++) { 
      if (this.studentList[i].id === id) { 
        break; 
      } 
    } 
    this.studentList.splice(i, 1); 
  } 

}

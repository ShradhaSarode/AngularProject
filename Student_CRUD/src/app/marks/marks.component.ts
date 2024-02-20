import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../student/student.service';
import { MarksService } from './marks.service';
import { Marks } from './marksDTO';
import { Student } from '../student/studentDTO';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-marks',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './marks.component.html',
  styleUrl: './marks.component.css'
})
export class MarksComponent implements OnInit {

  marksServise:MarksService=inject(MarksService);
  marksList:Marks[]=[];
  studentServise:StudentService=inject(StudentService);
  studList:Student[]=[];
  marks:Marks={};
  isUpdatebtn:boolean=false;
  // marks1:number|unknown;
  // marks2:number|unknown;
  // marks3:number|unknown;

  studentid:number|any;
  stud:any;

constructor(private route:ActivatedRoute,private router:Router){}

  ngOnInit():void{
    let id=0;
    this.getMarks();
    this.getStudent();
    this.isUpdatebtn=false;
    //this.departmentList=this.departmentService.getAllDepartment();

    this.studentid=this.route.snapshot.paramMap.get('id');
    if(this.studentid!='')
    {
      this.stud=this.studentServise.getStudentById(this.studentid ); 
    }
   
    
  }
  addMarks()
  {
    this.marksServise.addMarks(this.marks);//error create method in service
    this.getMarks();
  }
  getMarks()
  {
    this.marksList=this.marksServise.getAllMarks();//error create method in service
  }
  getStudent(){
    this.studList=this.studentServise.getAllStudents();
  }

  displayPercentage(subject1:number,subject2:number,subject3:number):string
  {
    const total=subject1+subject2+subject3;
    const percentage=(total/300)*100;
    return percentage.toFixed(1);
  }
 
  
  // generatePDF()
  // {
  //   const pdf=new jsPDF();
  //   pdf.text('Student Result',10,10);
  //   pdf.text('University Name: SRTM University Nanded ',10,20);
  //   pdf.text('Student Id: ${this.stud?.id}',10,30);
  //   pdf.text('Student Name: ${this.stud?.name}',10,40);
  //   pdf.text('Subject: ',10,60);
  //   pdf.text('JavaScript: ',10,70);
  //   pdf.text('${this.stud?.subject1}',100,85);
  //   pdf.text('TypeScript: ',20,80);
  //   pdf.text('${this.stud?.subject2}',100,90);
  //   pdf.text('Angular: ',20,90);
  //   pdf.text('${this.stud?.subject3}',100,95);
  //   pdf.text('Total: ',20,100);
  //   pdf.text('Percentage',20,100);
  //   pdf.save('result.pdf');
  // }
  printDetails() 
  { 
     
      const pdf = new jsPDF(); 
 
      // Add content to the PDF 
      pdf.text('Student Result', 10, 10); 
      pdf.text('University Name: SRTM University Nanded', 10, 20); 
      pdf.text(`Student ID: ${this.stud?.id}`, 10, 30); 
      pdf.text(`Student Name: ${this.stud?.name}`, 10, 40); 
   
      // Subjects and Marks 
      pdf.text('Subjects:', 10, 60); 
      pdf.text('JavaScript:', 20, 70); 
      pdf.text(`${this.stud?.subject1}`, 100, 85); 
   
      pdf.text('TypeScript:', 20, 80); 
      pdf.text(`${this.stud?.subject2}`, 100, 90); 
   
      pdf.text('Angular:', 20, 90); 
      pdf.text(`${this.stud?.subject3}`, 100, 95); 
   
      // Total 
      pdf.text('Total:', 20, 100); 
      pdf.text(`${this.displayPercentage(this.stud?.marks1, this.stud?.marks2, this.stud?.marks3)}`, 100, 100); 
   
      // Percentage 
      pdf.text('Percentage:', 20, 110); 
      pdf.text(`${this.displayPercentage(this.stud?.marks1, this.stud?.marks2, this.stud?.marks3)}%`, 100, 110); 
   
      // Save the PDF 
      pdf.save('result.pdf'); 
    }
 
  goBack()
  {
    this.router.navigate(['/student']);
  }

}

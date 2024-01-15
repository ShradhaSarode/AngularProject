import { CommonModule } from '@angular/common';
import { Component ,inject,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from './departmentDTO';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departmentList:Department[]=[];


  departmentServise:DepartmentService=inject(DepartmentService);
  ngOnInit():void{
    this.getDept();
    this.isUpdatebtn=false;
    this.department
  }
  getDept()
  {
    this.departmentList=this.departmentServise.getAllDepartment();
  }
  department:Department={};

  saveDept()
  {
    if(!this.isUpdatebtn)
    {
      this.departmentServise.addDept(this.department);
    }
    else{
      this.departmentServise.updateDept(this.department);
    }
    this.getDept()
    this.department={};
    this.isUpdatebtn=false;
  }

  isUpdatebtn:boolean=false;
  editDept(dept:Department)
  {
    this.isUpdatebtn=true;
    this.department=dept;
  }
 //delete emp
deleteDept(id:number |undefined){
  let response=confirm('Do you want to delete id '+id +' ?');
  if(response==true){
   this.departmentServise.deleteDept(id);
   this.getDept();
  }
 }
}

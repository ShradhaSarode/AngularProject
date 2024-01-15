import { Injectable } from '@angular/core';
import { Department } from './departmentDTO';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList:Department[]=[];
  private id:number=1;
  constructor() {
    this.departmentList.push({
      id:1,name:"IT",noOfEmp:4500
    });
   }

   generateDeptId():number
   {
     this.id++;
     return this.id;
   }

  public getAllDepartment():Department[]
  {
    return this.departmentList;
  }
  public getDeptById(id:number)
  {

  }
  public addDept(dept:Department):void
  {
    dept.id=this.generateDeptId();
    this.departmentList.push({id:dept.id,name:dept.name,noOfEmp:dept.noOfEmp});
  }
  public updateDept(dept:Department):void{
    for(let i=0;i<this.departmentList.length;i++){
      if(this.departmentList[i].id===dept.id){  // === to check whether value + data both are same
          this.departmentList[i].name=dept.name;
          this.departmentList[i].noOfEmp=dept.noOfEmp;
         
          break;
      }
    }
  }

  public deleteDept(id:number|undefined){
    let i=0;
    for(;i<this.departmentList.length;i++){
      if(this.departmentList[i].id===id){  // === to check whether value + data both are same
          break;
      }
    }
    this.departmentList.splice(i,1);
}
}

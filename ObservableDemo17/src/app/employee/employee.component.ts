import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EmployeeService } from './employee.service';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../department/department.service';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  empService: EmployeeService = inject(EmployeeService);
  deptService: DepartmentService = inject(DepartmentService);
  employeeList: any = [];
  empForm!: FormGroup;
  isUpdatebtn!: boolean;
  departmentService:DepartmentService=inject(DepartmentService);
  departmentList: any = [];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  queryValue: string | unknown;

  ngOnInit(): void {
    this.getEmp();
    this.getDept();
    this.empForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      salary: [, Validators.required],
      department: ['', Validators.required]
    });


    this.isUpdatebtn = false;
    // read the query parameter value using paramMap obervable
    this.route.paramMap.subscribe(x => {
      this.queryValue = x.get('id');
    })
    if (this.queryValue != '' && this.queryValue !=null) {
      alert(this.queryValue);
    }

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
  get department() {
    return this.empForm.get('department');
  }
  getEmp() {
    this.empService.getEmp().subscribe(result => {
      this.employeeList = result;
      console.log(this.employeeList);
    })
  }

  getDept() {
    this.deptService.getDept().subscribe(result => {
      this.departmentList = result;
      console.log(this.departmentList);
    })
  }

  // save & update product
  saveEmp() {
    let employee = this.empForm.value;
    if (!this.isUpdatebtn) {
      this.empService.saveEmp(employee).subscribe(result => {
      });
    }
    else {
      let id = parseInt(this.empForm.value.id);
      this.empService.updateEmp(id, employee).subscribe(result => {
      });
    }
    this.getEmp();
    this.empForm.reset();
    this.isUpdatebtn = false;
  }


  editEmp(p: any) {
    this.isUpdatebtn = true;


    this.empForm.setValue({
      id: p.id,
      name: p.name,
      salary: p.salary,
      department:p.department
    });
  }
  deleteEmp(id: any) {
    let response = confirm('Do you want to delete ' + id + ' ?');
    if (response == true) {
      this.empService.deleteEmp(id).subscribe(result => {
        this.getEmp();
      })
    }
  }
  //query parameter
  infoEmp(id: number) {
    this.router.navigate(['/', id])
  }
  
}

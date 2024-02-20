import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from './department.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  
  deptForm!: FormGroup;
  isUpdatebtn!: boolean;
  deptService:DepartmentService=inject(DepartmentService);
  deptList: any = [];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  queryValue: string | unknown;

  ngOnInit(): void {
    this.getDept();
    this.deptForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      noofemp: [, Validators.required]
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
    return this.deptForm.get('id');
  }
  get name() {
    return this.deptForm.get('name');
  }
  get noofemp() {
    return this.deptForm.get('noofemp');
  }
  getDept() {
    this.deptService.getDept().subscribe(result => {
      this.deptList = result;
      console.log(this.deptList);
    })
  }


  // save & update 
  saveDept() {
    let department = this.deptForm.value;
    if (!this.isUpdatebtn) {
      this.deptService.saveDept(department).subscribe(result => {
      });
    }
    else {
      let id = parseInt(this.deptForm.value.id);
      this.deptService.updateDept(id, department).subscribe(result => {
      });
    }
    this.getDept();
    this.deptForm.reset();
    this.isUpdatebtn = false;
  }


  editDept(p: any) {
    this.isUpdatebtn = true;


    this.deptForm.setValue({
      id: p.id,
      name: p.name,
      noofemp: p.noofemp
    });
  }
  deleteDept(id: any) {
    let response = confirm('Do you want to delete ' + id + ' ?');
    if (response == true) {
      this.deptService.deleteDept(id).subscribe(result => {
        this.getDept();
      })
    }
  }
  //query parameter
  infoDept(id: number) {
    this.router.navigate(['/product-details', id])
  }
 
}

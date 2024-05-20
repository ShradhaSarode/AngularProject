import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  deptForm!: FormGroup;
  isUpdatebtn!: boolean;
  deptList: any = [];
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
  private deptService:ManagementService) { }
  queryValue: string | unknown;
  ngOnInit(): void {
    this.getDept();
    this.deptForm = this.fb.group({
      deptid: [],
      deptname: ['', Validators.required]
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

  get deptid() {
    return this.deptForm.get('deptid');
  }
  get deptname() {
    return this.deptForm.get('deptname');
  }
  getDept() {
    this.deptService.getDept().subscribe(result => {
      this.deptList = result;
      console.log(this.deptList);
    })
  }
}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarServiceService } from '../car-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cartype',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './cartype.component.html',
  styleUrl: './cartype.component.css'
})
export class CartypeComponent {
  ctForm!: FormGroup;
  isUpdatebtn!: boolean;
  ctList: any = [];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private ctService:CarServiceService) { }
  queryValue: string | unknown;


  ngOnInit(): void {
    this.getCarType();
    this.ctForm = this.fb.group({
      typeid: [],
      cartype: ['', Validators.required]
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


  get typeid() {
    return this.ctForm.get('typeid');
  }
  get cartype() {
    return this.ctForm.get('cartype');
  }
  
  getCarType() {
    this.ctService.getCarType().subscribe(result => {
      this.ctList = result;
      console.log(this.ctList);
    })
  }
}

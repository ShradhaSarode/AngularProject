import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { CarServiceService } from '../car-service.service';
import { CommonModule } from '@angular/common';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet, RouterModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  carList: any = [];
  carForm!: FormGroup;
  isUpdatebtn!: boolean;
  queryValue: string | unknown;
  carobj: any={};
  carId: number = this.route.snapshot.params["carid"];
  processedImage: any;

  cost: number = 300;
  numDays: number = 0;
  totalhr: number = 0;
  totalCost: number = 0;
  discount: number = 10;
  discountedPrice: number = 0;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarServiceService) { }

  ngOnInit(): void {
    this.adddatetime();
    this.getuserId();
    // this.calculateDiscount();
    this.carForm = this.fb.group({
      userid: [],
      fromdatetime: [, Validators.required],
      todatetime: [, Validators.required]
    })

    let carid = sessionStorage.getItem('carid');
    if (carid != null)
      this.getCarById(parseInt(carid));

    this.adddatetime();
  }


  request: any = {};
  adddatetime() {
    // this.request = this.carForm.value;
    this.request.fromdatetime = sessionStorage.getItem("fromdatetime");
    this.request.todatetime = sessionStorage.getItem("todatetime");
    this.carService.getDatetime(this.request).subscribe(result => {
      console.log(result);
      // this.calculateDiscount();
    });
    
  }

  getuserId() {
    // this.request = this.carForm.value;
    this.request.userid = sessionStorage.getItem("userid");
    this.carService.getUserid(this.request).subscribe(result => { console.log(result) });
  }
  getCarById(id: any) {
    this.carService.getCarById(id).subscribe(result => {
      console.log(result);
      this.carobj = result;
    })
  }
  calculateDiscount() {
    const fromDateTime = new Date(this.request.fromdatetime);
    const toDateTime = new Date(this.request.todatetime);
    const differenceInMilliseconds =  toDateTime.getTime() - fromDateTime.getTime();
    this.totalhr = differenceInMilliseconds / (1000 * 60 * 60);
    this.totalCost = this.cost * this.totalhr;
    this.discount = this.totalCost * 0.1;
    this.discountedPrice = this.totalCost - this.discount;
  }
  
  // let dataObject = {
  //   variable1: var1,
  //   variable2: var2,
  //   variable3: var3
  // };

  saveBooking() {
    let book = this.carForm.value;
    if (!this.isUpdatebtn) {
      this.carService.saveBooking(book).subscribe(result => {
      });
    }
    // else {
    //   let id = parseInt(this.carForm.value.id);
    //   this.carService.updateCar(id, car).subscribe(result => {
    //   });
    // }
    // this.getCar();
    this.carForm.reset();
    this.isUpdatebtn = false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToLogout() {
    this.router.navigate(['/index']);
  }
}

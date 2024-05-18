import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CarServiceService } from '../car-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  carList: any = [];
  carForm!: FormGroup;
  isUpdatebtn!: boolean;
  queryValue: string | unknown;
  // searchlist: any = [];
  // carser:CarServiceService=inject(CarServiceService)

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private carService: CarServiceService) { }

  ngOnInit(): void {
    // this.getSearch();
    this.getCar();
   
  }

  // getSearch() {
  //   this.carService.getSearch().subscribe(result => {
  //     this.searchlist = result
  //     console.log(this.searchlist);
  //   })
  // }

  getCar() {
    this.carService.getCar().subscribe(result => {
      this.carList = result;
      console.log(this.carList);
    })
  }

  carBooking(id: number) {

    sessionStorage.setItem('carid', id.toString())
    console.log('carid');
    this.router.navigate(['/booking']);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToLogout() {
    this.router.navigate(['/login']);
  }

}

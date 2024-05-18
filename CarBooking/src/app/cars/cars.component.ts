import { Component, inject } from '@angular/core';
import { CarServiceService } from '../car-service.service';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  carService: CarServiceService = inject(CarServiceService);
  carList: any = [];
  carForm!: FormGroup;
  ctList: any = [];
  isUpdatebtn!: boolean;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private http:HttpClient) { }
  queryValue: string | unknown;
  selectedFile: File | any;
  
  ngOnInit(): void {
    this.getCar();
    this.getCarType();
    this.carForm = this.fb.group({
      carid: [],
      modelname: ['', Validators.required],
      noofseats: ['', Validators.required],
      cost: [, Validators.required],
      typeid: [, Validators.required],
      image: [, Validators.required],
      status:[]
    });

    this.isUpdatebtn = false;
    
    this.route.paramMap.subscribe(x => {
      this.queryValue = x.get('id');
    })
    if (this.queryValue != '' && this.queryValue !=null) {
      alert(this.queryValue);
    }

  }


  get carid() {
    return this.carForm.get('carid');
  }
  get modelname() {
    return this.carForm.get('modelname');
  }
  get noofseats() {
    return this.carForm.get('noofseats');
  }
  get cost() {
    return this.carForm.get('cost');
  }
  get typeid() {
    return this.carForm.get('typeid');
  }
  get image() {
    return this.carForm.get('image');
  }
  get status() {
    return this.carForm.get('status');
  }
  getCar() {
    this.carService.getCar().subscribe(result => {
      this.carList = result;
      console.log(this.carList);
    })
  }
  getCarType() {
    this.carService.getCarType().subscribe(result => {
      this.ctList = result;
      console.log(this.ctList);
    })
  }

  saveCar() {
    let car = this.carForm.value;
    if (!this.isUpdatebtn) {
      this.carService.saveCar(car).subscribe(result => {
      });
    }
    else {
      let id = parseInt(this.carForm.value.id);
      this.carService.updateCar(id, car).subscribe(result => {
      });
    }
    this.getCar();
    this.carForm.reset();
    this.isUpdatebtn = false;
  }


  editCar(p: any) {
    this.isUpdatebtn = true;


    this.carForm.setValue({
      carid: p.carid,
      modelname: p.modelname,
      noofseats:p.noofseats,
      cost: p.cost,
      typeid:p.typeid,
      image:p.image
    });
    this.getCar();
  }
  deleteCar(id: any) {
    let response = confirm('Do you want to delete ' + id + ' ?');
    if (response == true) {
      this.carService.deleteCar(id).subscribe(result => {
        this.getCar();
      })
    }
  }
  
  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0] as File;
    this.onUpload();
  }

  onUpload(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
console.log(this.selectedFile);
    // Send HTTP request to upload image to assets folder
    this.http.post<any>('http://localhost:4200/assets/images', formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.carService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        
        },
        (err) => {
        
        })
    });

    reader.readAsDataURL(file);
  }
 
  updateStatus(car: any, value: number | any) {
    if (value === 1) {
      car.status = "Available";
    }
    else if (value === 2) {
      car.status = "Unavailable";
    }
    
    this.carService.updateStatus(car).subscribe(result => {
      this.getCar();
    })
  }

  goToLogin()
  {
    this.router.navigate(['/login']);
  }
  goToRegister()
  {
    this.router.navigate(['/register']);
  }
  goToLogout()
  {
    this.router.navigate(['/login']);
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
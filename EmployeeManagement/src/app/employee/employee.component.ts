import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employeeList: any = [];
  empForm!: FormGroup;
  isUpdatebtn!: boolean;
  departmentList: any = [];
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
  private empService:ManagementService) { }
  queryValue: string | unknown;

  ngOnInit(): void {
    this.getEmp();
    this.getDept();
    this.verifyUserLocation();
    this.empForm = this.fb.group({
      empid: [],
      name: ['', Validators.required],
      department: ['', Validators.required],
      salary: [, Validators.required],
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

  get empid() {
    return this.empForm.get('empid');
  }
  get name() {
    return this.empForm.get('name');
  }
  get department() {
    return this.empForm.get('department');
  }
  get salary() {
    return this.empForm.get('salary');
  }
  getEmp() {
    this.empService.getEmp().subscribe(result => {
      this.employeeList = result;
      console.log(this.employeeList);
    });
  }

  getDept() {
    this.empService.getDept().subscribe(data => {
      this.departmentList = data;
    });
  }
  // save & update product
  saveEmp() {
    let employee = this.empForm.value;
    if (!this.isUpdatebtn) {
      this.empService.saveEmp(employee).subscribe(result => {
      });
      console.log(employee);
    }
    else {
      let id = parseInt(this.empForm.value.id);
      this.empService.updateEmp(id, employee).subscribe(result => {
      });
      console.log(employee);
    }
    this.getEmp();
    this.empForm.reset();
    this.isUpdatebtn = false;
  }

  editEmp(e: any) {
    this.isUpdatebtn = true;
    this.empForm.setValue({
      empid: e.empid,
      name: e.name,
      department: e.deptid ,//? e.department : '', // Provide a default value
      salary: e.salary
    });
  }
  deleteEmp(empid: any) {
   
    let response = confirm('Do you want to delete ' + empid + ' ?');
    if (response === true) {
      this.empService.deleteEmp(empid).subscribe(result => {
        this.getEmp();
      });
    }
  }

  verifyUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
       this.getLocationOfUser(latitude, longitude);
       console.log(latitude);
       console.log(longitude);
      //this.getLocationOfUser(37.7749, -122.4194);
       // Example usage
     //  const latitude = 37.7749; // Example latitude (San Francisco)
     //  const longitude = -122.4194; // Example longitude (San Francisco)
       
        //console.log(latitude:${latitude}, longitude:${longitude});
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          default:
            console.error("An unknown error occurred.");
            break;
        }
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }

  getLocationOfUser(latitude:any, longitude:any)
  {
    this.empService.getEmpLocation(latitude,longitude).subscribe(result => {
      console.log(result);
      // whether report 
    });
    
  }

  logout()
{
  this.router.navigate(['/login']);
}
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { CarServiceService } from '../car-service.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  indexForm!: FormGroup;
  queryValue: string | unknown;
  indexlist: any = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private indexService: CarServiceService) { }
  ngOnInit(): void {
    // this.addDateTime();
    this.indexForm = this.fb.group({
      pickup: ['PCMC'],
      fromdatetime: ['', Validators.required],
      todatetime: ['', Validators.required]
    });
    this.route.paramMap.subscribe(x => {
      this.queryValue = x.get('id');
    })
    if (this.queryValue != '' && this.queryValue != null) {
      alert(this.queryValue);
    }
  }
  get pickup() {
    return this.indexForm.get('pickup');
  }
  get fromdatetime() {
    return this.indexForm.get('fromdatetime');
  }

  get todatetime() {
    return this.indexForm.get('todatetime');
  }

  getdatetime(){
    const data=this.indexForm.value;
    
    this.indexService.getDatetime(data).subscribe(matchResult=>{
      console.log(data);
      sessionStorage.setItem("fromdatetime",data.fromdatetime);
      sessionStorage.setItem("todatetime",data.todatetime); 
      this.router.navigate(['/search']);   
    },
    error =>{
      console.error(error);
      alert('Error Occurred');
    }
  );
  sessionStorage['reset'];
  }

  goToSearch() {
    this.getdatetime();
    
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}

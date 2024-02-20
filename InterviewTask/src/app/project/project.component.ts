import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterOutlet],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

  projectForm!:FormGroup;
  queryValue:string|null=null;
  isUpdatebtn:boolean=false;
  

  constructor(private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private projectservice:ProjectService){}

    reasonList=["Business","Dealership","Transport"];
    typeList=["Internal","Extarnal","Vendor"];
    divisionList=["","Compressor","Filters","Pumps","Glass","Water Heater"];
    categoryList=["","Quality A","Quality B","Quality C","Quality D"];
    priorityList=["","High","Medium","Low"];
    departmentList=["","Strategy","Fianance","Quality","Maintenance","Stores"];
    locationList=["","Pune","Mumbai","Delhi"];
 

    ngOnInit(): void {
      this.projectForm=this.fb.group({
        projectname:['',Validators.required],
        reason:['',Validators.required],
        type:['',Validators.required],
        division:['',Validators.required],
        category:['',Validators.required],
        priority:['',Validators.required],
        department:['',Validators.required],
        startdate:['',Validators.required],
        enddate:['',Validators.required],
        location:['',Validators.required],
        status:["new"]
      });
    }

    get reason()
    {
      return this.projectForm.get('reason');
    }

    get type()
    {
      return this.projectForm.get('type');
    }

    get division()
    {
      return this.projectForm.get('division');
    }

    get category()
    {
      return this.projectForm.get('category');
    }

    get priority()
    {
      return this.projectForm.get('priority');
    }

    get department()
    {
      return this.projectForm.get('department');
    }

    get startdate()
    {
      return this.projectForm.get('startdate');
    }

    get enddate()
    {
      return this.projectForm.get('enddate');
    }

    get location()
    {
      return this.projectForm.get('location');
    }


    
    saveProject(){
      let project=this.projectForm.value;
      this.projectservice.addProject(project).subscribe(result=>{});
      this.projectForm.reset();
    }
    
    logout(){
      // localStorage.clear(); // it will remove email from localstorage
      this.router.navigate(['/login']);
}
  goNext()
  {
    this.router.navigate(['/project-listing']);
  }

  dashboard()
  {
    this.router.navigate(['/dashboard']);
  }
}

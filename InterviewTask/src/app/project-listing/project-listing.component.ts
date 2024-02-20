import { Component, OnInit, inject } from '@angular/core';

import { ProjectListingService } from './project-listing.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-project-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterOutlet,RouterModule,HttpClientModule],
  templateUrl: './project-listing.component.html',
  styleUrl: './project-listing.component.css'
})
export class ProjectListingComponent implements OnInit {


  // project:Project={};
  //  plistForm!:FormGroup;
  //  plistservice:ProjectListingService=inject(ProjectListingService);
  projectList: any[] = [];
  searchText: string = '';
  // Filtered project list based on search
  filteredProjects: any= []; 


  constructor(private projectListService: ProjectListingService,
    private router: Router,
    private route: ActivatedRoute,
    private projectservise: ProjectService) { }
  ngOnInit(): void {
    this.fetchProjectList();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadProjectDetails(id);
        // this.project = this.createprojectService.getProjectById(id); 
      }
    })
  }
  fetchProjectList() {
    this.projectListService.getAllProject().subscribe(
      (projects) => {
        this.projectList = projects;
        this.performSearch();
      },
      (error) => {
        console.error('Error fetching project list:', error);
      }
    );
  }

  loadProjectDetails(projectId: number) {
    // Fetch project details by ID and update the projectList array 
    this.projectservise.getProjectDetailsById(projectId).subscribe(
      (projectDetails) => {
        this.projectList = [projectDetails]; // Replace the entire projectList array with the fetched details 
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  getProjects() {
    this.projectListService.getAllProject().subscribe(result => {
      this.projectList = result;
      console.log(this.projectList);
    });
  }

  updateStatus(project: any, value: number | any) {
    if (value === 1) {
      project.status = "Running";
    }
    else if (value === 2) {
      project.status = "Closed";
    }
    else if (value === 3) {
      project.status = "Cancelled";
    }
    this.projectListService.updateStatus(project).subscribe(result => {
      this.getProjects();
    })
  }

  sortTable() {
    if (this.selectedValue === "1") {
      this.projectList = this.projectList.sort((a, b) => (a.projectName > b.projectName ? 1 : -1));

    }
    else if (this.selectedValue === "2") {
      this.projectList = this.projectList.sort((a, b) => (a.reason > b.reason ? 1 : -1));

    }
    else if (this.selectedValue === "3") {
      this.projectList = this.projectList.sort((a, b) => (a.type > b.type ? 1 : -1));

    }
    else if (this.selectedValue === "4") {
      this.projectList = this.projectList.sort((a, b) => (a.division > b.division ? 1 : -1));

    }
    else if (this.selectedValue === "5") {
      this.projectList = this.projectList.sort((a, b) => (a.category > b.category ? 1 : -1));

    }
    else if (this.selectedValue === "6") {
      this.projectList = this.projectList.sort((a, b) => (a.priority > b.priority ? 1 : -1));

    }
    else if (this.selectedValue === "7") {
      this.projectList = this.projectList.sort((a, b) => (a.department > b.department ? 1 : -1));

    }
    else if (this.selectedValue === "8") {
      this.projectList = this.projectList.sort((a, b) => (a.location > b.location ? 1 : -1));

    }
    else if (this.selectedValue === "9") {
      this.projectList = this.projectList.sort((a, b) => (a.status > b.status ? 1 : -1));

    }
  }

  selectedValue: string = "";
  getSelectedvalue(event: any) {
    this.selectedValue = event.target.value;
    this.sortTable();
  }

 // Method to perform search
 performSearch(): void {
  console.log('in side perform search')
  // Convert search text to lowercase for case-insensitive search
  console.log(this.projectList)
  this.filteredProjects=[];
  const searchTerm = this.searchText.toLowerCase();
  console.log(searchTerm);

  if(searchTerm!=''){
    
    this.filteredProjects = this.projectList.filter(project =>
      // Check if the search term exists in any column
      Object.values(project).some(value =>
        value ? value.toString().toLowerCase().includes(searchTerm) : false
      )
    );
  }
 else{
  this.filteredProjects=this.projectList;
 }
  
}

  goBack() {
    this.router.navigate(['/project']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

}

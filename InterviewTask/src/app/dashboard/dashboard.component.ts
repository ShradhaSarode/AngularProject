import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ProjectListingService } from '../project-listing/project-listing.service';
import { ProjectService } from '../project/project.service';
import { HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule,RouterModule,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  public chart: any;

  totalProjectsCount=0; 
  closedProjectsCount=0; 
  runningProjectsCount=0; 
  ClosureDelayCount=0; 
  cancelledProjectsCount=0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardservice:DashboardService) { }

    ngOnInit(): void { 
     
      this.dashboardservice.getTotalCount().subscribe(count=>{ 
        this.totalProjectsCount=count; 
      }); 
 
      this.dashboardservice.getClosedCount().subscribe(count=>{ 
        this.closedProjectsCount=count; 
      }); 
 
      this.dashboardservice.getRunningCount().subscribe(count=>{ 
        this.runningProjectsCount=count; 
      }); 
 
      this.dashboardservice.getClosureDelayCount().subscribe(count=>{ 
        console.log(count);
        this.ClosureDelayCount=count; 
      }); 
 
      this.dashboardservice.getCancelledCount().subscribe(count=>{ 
        this.cancelledProjectsCount=count; 
      }); 

       
 
      this.createChart(); 
  }

    createChart() {
      const departments = ['Strategy', 'Fianance', 'Quality','Maintenance','Stores'];
    
      this.dashboardservice.getTotalCount().subscribe(totalCount => {
        this.totalProjectsCount = totalCount; // Assuming getTotalCount returns a single number
    
        this.dashboardservice.getClosedCount().subscribe(closedCount => {
          this.closedProjectsCount = closedCount; // Assuming getClosedCount returns a single number
    
          this.chart = new Chart("MyChart", {
            type: 'bar',
            data: {
              labels: departments,
              datasets: [
                {
                  label: "Total",
                  data: Array(departments.length).fill(this.totalProjectsCount),
                  backgroundColor: 'blue'
                },
                {
                  label: "Closed",
                  data: Array(departments.length).fill(this.closedProjectsCount),
                  backgroundColor: 'limegreen'
                }
              ]
            },
            options: {
              aspectRatio: 2.2
            }
          });
        });
      });
    }

    goBack() {
      this.router.navigate(['/project']);
    }
  
    logout() {
      this.router.navigate(['/login']);
    }
    goNext()
    {
      this.router.navigate(['/project-listing']);
    }
    
}

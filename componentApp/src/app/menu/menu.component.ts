import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {


  isUserLoggedIn:boolean=false;
  userEmail:any='';
  constructor(private router:Router){}
 ngOnInit(): void {
     // read the value from the localstorage
     this.userLoggedIn();
 }
 // when we want to check the modification done in the component's data
 // angular does not dectect the change by its own
 ngDoCheck(){
   this.userLoggedIn();
 }
 logout(){
       localStorage.clear(); // it will remove email from localstorage
       this.router.navigate(['/login']);
      this.userLoggedIn();
 }


 userLoggedIn(){
   this.userEmail=localStorage.getItem('useremail');
     if(this.userEmail!="" && this.userEmail!=null){
       this.isUserLoggedIn=true;
     }
     else{
       this.isUserLoggedIn=false;
     }
 }
}


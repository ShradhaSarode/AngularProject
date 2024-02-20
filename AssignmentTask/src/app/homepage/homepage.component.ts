import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,RouterOutlet,HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  // isOnline: boolean = true;

  // constructor(private networkService: UserService,private router: Router) {
  //   this.checkNetworkStatus();
  // }

  // checkNetworkStatus() {
  //   this.networkService.isOnline.subscribe((status: boolean) => {
  //     this.isOnline = status;
  //   });
  // }
  status = 'ONLINE'; 
isConnected! :boolean;
internetAvailable: boolean = false;

constructor(private connectionService: ConnectionService,private router: Router) {}
ngOnInit(): void {
  this.checkInternetConnection();
}
checkInternetConnection() {
  this.internetAvailable = navigator.onLine;
  window.addEventListener('online', () => this.updateInternetStatus());
  window.addEventListener('offline', () => this.updateInternetStatus());
}
updateInternetStatus() {
  this.internetAvailable = navigator.onLine;
}
  goToLogin() {
    this.router.navigate(['/login']);
  }
}

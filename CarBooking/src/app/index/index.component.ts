import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute)
  {}
 
  goToSearch()
  {
    this.router.navigate(['/search']);
  }
  goToLogin()
  {
    this.router.navigate(['/login']);
  }
  goToRegister()
  {
    this.router.navigate(['/register']);
  }
}

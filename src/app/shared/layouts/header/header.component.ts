import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  logged_in: boolean = false;
  language: string = 'English';
  user_role!: any

  constructor(private router: Router, @Inject(PLATFORM_ID) public platformId: object) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    //this.user_role= sessionStorage.getItem("role");
    this.logged_in=false;
    if (typeof sessionStorage !== 'undefined') {
      const user_session_id = sessionStorage.getItem("user_session_id");
      if (user_session_id) {
        this.logged_in = true;
      }
    }
  }
  logout() {
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    this.router.navigateByUrl('/sign-in');
  }
}

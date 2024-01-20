import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
logged_in:boolean = true;
language:string = 'English';
user_role!: any;

constructor( private router: Router ){}

ngOnInit(): void {
}

ngDocheck(){
this.user_role= sessionStorage.getItem("user_role");
const user_session_id = sessionStorage.getItem("user_session_id");
if(user_session_id){
this.logged_in = true ;
}
}
logout(){
sessionStorage.removeItem("user_session_id");
sessionStorage.removeItem("user_role");
this.router.navigateByUrl('/sign-in');
//location.reload();
}
}

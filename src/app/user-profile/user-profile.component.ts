import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
userProfileForm!: FormGroup;
userProfile: boolean = false;
user_id!:number;
user_data:any;
user_update_data:any;
user_dto!: User;
user_profile_pic:any;
user_language:any;
user_role:any;

 constructor(private formBuilder:FormBuilder, private router:Router, private user_Service: UserService){}

 ngOnInit(): void {
   this.user_id = Number(sessionStorage.getItem("user_session_id"));
   this.userProfileForm = this.formBuilder.group({
    name: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    age: ['', Validators.required],
    dob: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    addLine1: ['', Validators.required],
    addLine2: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    language: ['', Validators.required],
    uploadphoto: ['',Validators.required],
    gender: ['', Validators.required],
    aboutYou: ['', Validators.required],
    agreetc: ['', Validators.required],
    role: ['', Validators.required]
   })
 }

 get rf(){
  return this.userProfileForm.controls;
 }

 editUserData(user_id:any){
  this.user_Service.get
 }
}

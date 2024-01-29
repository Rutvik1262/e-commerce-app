import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';

declare var JQuery:any;
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit{
  all_user_data: any;
  single_user_data: any;
  addEditUserForm!: FormGroup;
  user_dto!: User;
  user_reg_data: any;
  edit_user_id: any;
  upload_file_name!: string;
  addEditUser: boolean = true;
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header!: string;
  signInFormValue: any = {}

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private router: Router ) { }
  ngOnInit(): void {
     this.getAllUser();
     console.log('All User Data.....:', this.all_user_data);
    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
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
      uploadphoto: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required]
    })
  }
  getAllUser() {
    this.adminService.allUser().subscribe(data => {
      this.all_user_data = data;
    }, error => {
      console.log("error", error);

    })
  }

  get rf() {
    return this.addEditUserForm.controls;
  }

  addUserPopup() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add new user";
    this.addEditUserForm.reset();
  }

  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert('error' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    console.log("addEditUser",this.addEditUser);
    
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address:{
        id:0,
        addLine1: this.user_reg_data. addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadphoto: this.user_reg_data.uploadphoto,
      role: this.user_reg_data.role,
    }
    this.adminService.addUser(this.user_dto).subscribe(data=>{
       this.getAllUser();
       JQuery('#addEditUserModel').modal('toggle');
    }, error =>{
      console.log("error",error);
      
    })
    }
    editUserPopup(user_id:any){
      this.edit_user_id = user_id;
      this.edit_user= true;
      this.add_user=false;
      this.popup_header='edit User';
      this.adminService.singleUser(user_id).subscribe(data=>{
        this.single_user_data = data;
        this.upload_file_name=this.single_user_data.uploadphoto;
        this.addEditUserForm.setValue({
          name:this.single_user_data.name,
          mobNumber: '32323232',
          age:this.single_user_data.age,
          dob:this.single_user_data.dob,
          email:this.single_user_data.email,
          password:this.single_user_data.password,
          language:this.single_user_data.language,
          gender:this.single_user_data.gender,
          addLine1:this.single_user_data.address.addLine1,
          addLine2:this.single_user_data.address.addLine2,
          city:this.single_user_data.address.city,
          state:this.single_user_data.address.state,
          zipCode:this.single_user_data.address.zipCode,
          aboutYou:this.single_user_data.aboutYou,
          uploadphoto:'',
          agreetc:this.single_user_data.agreetc,
          role:this.single_user_data.role,
        })
      },error =>{
        console.log("error",error);
      })
    }
    updateUser(){
    if (this.addEditUserForm.invalid) {
      alert('error' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address:{
        id:0,
        addLine1: this.user_reg_data. addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadphoto: (this.user_reg_data.uploadphoto == "" ? this.upload_file_name:this.
      user_reg_data.uploadphoto),
      role: this.user_reg_data.role,
    }
    this.adminService.editUser(this.edit_user_id,this.user_dto).subscribe(data=>{
       this.getAllUser();
       JQuery('#addEditUserModel').modal('toggle');
    },error =>{
      console.log("error",error);
      
    })
  }
  deleteUser(user_id:any){
    this.adminService.deleteUser(user_id).subscribe(data=>{
      this.getAllUser();
    },error =>{
      console.log("error",error); 
    })
  }
}

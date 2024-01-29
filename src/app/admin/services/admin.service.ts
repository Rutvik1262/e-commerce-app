import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
public user_url = "http://localhost:3000/user/";
public product_url= "http://localhost:3000/products/";
public all_order= "http://localhost:3000/orders/";

  constructor(private apiService:ApiService) { }

  userDashboardData(){
  return this.apiService.get(this.user_url);
  }
  productDashboardData(){
  return this.apiService.get(this.product_url);
  }
  allUser():Observable<any>{
  return this.apiService.get(this.user_url)
  }
  addUser(user_dto:any){
  return this.apiService.post(this.user_url, user_dto);
  }
  //get data of individual user
  singleUser(user_id:any){
  return this.apiService.get(this.user_url + user_id)
  }
  //update data for one user
   editUser(user_id:any, user_dto:any):Observable<any>{
   return this.apiService.put(this.user_url+user_id, user_dto);
   }
   //delete user
   deleteUser(user_id:any){
   return this.apiService.delete(this.user_url+user_id)
   }
   }

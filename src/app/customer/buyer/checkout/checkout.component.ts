import { Component, OnInit } from '@angular/core';
import { Order, Product, User } from '../../../core/Model/object-model';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
single_product_id:any;
user_id:any;
individual_product!:Product;
user_detail!: User;
user_adddress:any;
user_contact_no:any;
user_dto!:Order;

  constructor(private customerService:CustomerService, private router: Router){}

  // ngOnInit(): void {
  //     this.customerService.currentproduct.subscribe(product=>this.single_product_id = product);
  //     this.user_id = Number(sessionStorage.getItem('user_session_id'));
  //     this.productDetail(this.single_product_id);
  //     this.userAddress(this.user_id);
  // }

  ngOnInit(): void {
    this.customerService.currentproduct.subscribe(product => {
        console.log('Product received:', product);
        this.single_product_id = product;
        this.productDetail(this.single_product_id);
        console.log('single_product_id after subscription:', this.single_product_id);
    });
    this.user_id = Number(sessionStorage.getItem('user_session_id'));
    console.log('user_id:', this.user_id);
    this.userAddress(this.user_id);
}

  productDetail(single_product_id:any){
    this.customerService.individualProduct(single_product_id).subscribe(data=>{
      this.individual_product = data;
      console.log("this.individual_product", this.individual_product)
    }, error=>{
      console.log("error",error);
    })
  }
  userAddress(user_id:any){
    this.customerService.userDetail(user_id).subscribe(data=>{
      this.user_adddress = data.address;
      this.user_contact_no = data.mobNumber;
    },error=> {
      console.log("error",error);
    })
  }

}

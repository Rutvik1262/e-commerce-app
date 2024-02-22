import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboad.component.html',
  styleUrl: './buyer-dashboad.component.css'
})
export class BuyerDashboadComponent implements OnInit {
  all_product: any;
  show_Checkout: boolean = false;


  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
this.getAllProduct();
  }
  getAllProduct() {
    this.customerService.allProduct().subscribe(data => {
      this.all_product = data;
    }, error => {
      console.log("error", error);
    })
  }

  buyProduct(id: number) {
    this.show_Checkout = true;
    this.customerService.quickByProduct(id);
    this.router.navigateByUrl('/checkout');
  }
  addToCart() {
    alert("this is showcase");
  }
}

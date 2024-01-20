import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogin implements CanActivate{
constructor(@Inject(Router) private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
  let role = sessionStorage.getItem("role");
  if(role =="admin"){
  this.router.navigate(["/admin-dashboard"]);
  return false;
  }else{
  return true;
  }
}
}

//after login check

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private router:Router) {}
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
  let role = sessionStorage.getItem("role");
  if(role =="admin"){
  return true;
  }else{
  this.router.navigate(['/admin-login']);
  return false;
  }
}
}

// customer (buyer/seller) before login
@Injectable({
  providedIn: 'root'
})
// export class SellerBuyerAuthGuardLogin implements CanActivate {
//     constructor(private router:Router) {}
//     canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
//     let role = sessionStorage.getItem("role");
//     if(role =="seller"){
//     this.router.navigate(["/seller-dashboard"]);
//     return false;
//     }else if (role =="buyer") {
//       this.router.navigate(["/buyer-dashboard"]);
//     return false;
//     }else{
//     return true;
//     }
export class SellerBuyerAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (typeof sessionStorage !== 'undefined') {
      let role = sessionStorage.getItem("role");
      if (role == "seller") {
        this.router.navigate(["/seller-dashboard"]);
        return false;
      } else if (role == "buyer") {
        this.router.navigate(["/buyer-dashboard"]);
        return false;
      } else {
        return true;
      }
    } else {
      console.error("sessionStorage is not available in this environment.");
      return false;
    }
  }
}
//buyer after login check
@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService implements CanActivate {
    constructor(private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    let role = sessionStorage.getItem("role");
    return role =="buyer";
  }
}

//seller after login check
@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService implements CanActivate{
  constructor(private router:Router) {}
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
  let role = sessionStorage.getItem("role");
  return role =="seller";
}
}

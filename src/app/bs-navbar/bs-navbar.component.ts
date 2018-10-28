import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  {
  appUser:{};
  shoppingCartItemsCount:number;
  constructor(private auth:AuthService,private cartService:ShoppingCartService) {
     

   }
   async ngOnInit(){
    this.auth.AppUser$.subscribe(appUser=> this.appUser = appUser);
    console.log(this.appUser);
    await this.cartService.getCart().
    then(cart=>{
      
     cart.snapshotChanges().subscribe(cartItems=>{
       console.log(cartItems);
       this.shoppingCartItemsCount = 0;
       for(let p in cartItems.payload.val().items)
       this.shoppingCartItemsCount += cartItems.payload.val().items[p].quantity;
     })
    })
   }

  
  logout(){
    //console.log(this.auth.user$);
    this.auth.logout();
  }


}

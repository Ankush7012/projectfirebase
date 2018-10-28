import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input('product') product; 
@Input('show-actions') showActions=true;
@Input('shopping-cart') shoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
  }
  addtoCart(){
    //localStorage.clear();
    //localStorage.setItem('cartId','0');
    this.cartService.addToCart(this.product);

  }
  removeFromCart(){
    //localStorage.clear();
    //localStorage.setItem('cartId','0');
    this.cartService.removeFromCart(this.product);

  }
  getQuantity(){
    //console.log(this.shoppingCart);
    if(!this.shoppingCart) return 0;
    
    let item  = this.shoppingCart.items[this.product.key];
   // console.log(item);
    return item ? item.quantity : 0;
  }

}

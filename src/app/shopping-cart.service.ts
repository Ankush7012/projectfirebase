import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot, AngularFireObject } from 'angularfire2/database';
import { Product } from './product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }
  private create(){
    return this.db.list('shopping-carts').push({
      dateCreated:new Date().getTime()
    });
  }
  //:Promise<Observable<AngularFireAction<DatabaseSnapshot<ShoppingCart>>>>
  async getCart():Promise<AngularFireObject<ShoppingCart>>{
    let cartId = await this.getOrCreateCartID();
    return this.db.object('shopping-carts/' + cartId);
  }
  private async getOrCreateCartID():Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId)
      return cartId;
    
    let result= await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
     
   
         
  }
  private getItem(cartId,productId):AngularFireObject<Product>{
    return this.db.object('shopping-carts/' + cartId + '/items/'+ productId);
  }
  
  

  async addToCart(product){
    this.updateitemQuantity(product,1);  
  }
  async removeFromCart(product){
    this.updateitemQuantity(product,-1);
    
    
  }
  private async updateitemQuantity(product,change:number){
    let cartId =  await this.getOrCreateCartID();
    //console.log(product.key);
    let item$ = this.getItem(cartId,product.key).snapshotChanges();
    let item1$ = this.getItem(cartId,product.key)
    item$.pipe(take(1)).subscribe(item=>{
      let qu;
      if (item.payload.val()==null)
         qu = 1;
      else
        qu= item.payload.val().quantity + change;
      
       item1$.update({product:product.payload.val(), quantity:qu});

      
    });
  }


}

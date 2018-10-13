import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }
  create(product){
   this.db.list('products').push(product);

  }

  getAll(){
    return this.db.list('products').snapshotChanges();
  }
  get(productID){
   // console.log(this.db.object('/products/'+productID).snapshotChanges());
    return this.db.object('/products/'+productID).valueChanges();
  }
  update(productId,product){
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId){
    console.log(productId);
    return this.db.object('/products/'+productId).remove();
  }
}

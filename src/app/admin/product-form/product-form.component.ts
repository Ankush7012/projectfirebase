import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../../product';
 @Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {
categories$;
product={
  title:'',
  category:'',
  imageurl:'',
  price:0
}; 
id;
  constructor(private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    //this.product = { title:'',imageurl:'',price:0,category:'bread'};
    if(this.id)   this.productService.get(this.id).pipe(take(1)).subscribe((p:Product)=>{ console.log(p); this.product =    p } );
    //console.log(this.product);
   }
   save(product){
     if(this.id) this.productService.update(this.id,product);
     else this.productService.create(product);
     
     this.router.navigate(['/admin/products']);


   }
   delete(){
    if(!confirm('Are you sure you want to delte this product?')) return true;
      
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
   }
 

}

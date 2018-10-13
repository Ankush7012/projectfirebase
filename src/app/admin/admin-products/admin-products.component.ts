import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
//import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products:any[];
  filteredProducts:any[];
  subscription:Subscription;
  //tableResource:DataTableResource<any>;
  //items:any[]= [];
  //itemCount:number;
  constructor(private productService:ProductService) {
    this.subscription = this.productService.getAll().subscribe(products=>{
      this.filteredProducts = this.products = products;

     // this.initializeTable(products);
    
    }
    );
   }
   /* private initializeTable(products:any[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset :0 })
    .then(items=>this.items = items);
    this.tableResource.count()
    .then(count=>this.itemCount = count);

   } */
   /* reloadItems(params){
     if(!this.tableResource) return;

    this.tableResource.query(params)
    .then(items=>this.items = items);

   } */

   filter(query:string){
     this.filteredProducts = (query) ? 
     this.products.filter(p=>p.payload.val().title.toLowerCase().includes(query.toLowerCase())) 
     : this.products;
     
   }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }

}

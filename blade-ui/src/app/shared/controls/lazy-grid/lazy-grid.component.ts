import { Component, Input } from '@angular/core';

export interface Product {
    id?:string;
    code?:string;
    name?:string;
    description?:string;
    price?:number;
    quantity?:number;
    inventoryStatus?:string;
    category?:string;
    image?:string;
    rating?:number;
}
@Component({
  selector: 'budget-lazy-grid',
  templateUrl: './lazy-grid.component.html',
  styleUrls: ['./lazy-grid.component.scss']
})
  
export class LazyGridComponent {

  @Input() value: any;

   selectedProduct1: Product;
}

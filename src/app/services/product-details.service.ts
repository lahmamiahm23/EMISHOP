import { Injectable } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  constructor() { }
  private clickedProduct=new BehaviorSubject<Produit|null>(null);
  clickedProduct$=this.clickedProduct.asObservable();
  setClickedProduct(product: Produit) {
    this.clickedProduct.next(product);
  }

}

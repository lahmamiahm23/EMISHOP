import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Produit } from '../../Modeles/produit';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private clickedProduct = new BehaviorSubject<Produit | null>(null);
  clickedProduct$ = this.clickedProduct.asObservable();

  setClickedProduct(product: Produit) {
    this.clickedProduct.next(product);
  }
}

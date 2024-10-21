import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../../Modeles/produit';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private apiUrl = 'https://your-api-url.com/products'; // Remplace par ton URL d'API
  private selectedProductSource = new BehaviorSubject<Produit | null>(null);
  selectedProduct$ = this.selectedProductSource.asObservable();
  constructor(private http: HttpClient) {}
  setSelectedProduct(product: Produit): void {
    this.selectedProductSource.next(product);
  }
  getProductById(id: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }
}

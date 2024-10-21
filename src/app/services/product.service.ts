import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }

  getAllCategories(): Observable<any> {
    return this.http.get('https://dummyjson.com/products/category-list');
  }

  getProductByKey(text: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/search?q=${text}`);
  }

  getProduitByCategory(category: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/category/${category}`);
  }
}

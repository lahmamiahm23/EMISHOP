import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { ProductAPI } from '../Modeles/product-api';
import { BehaviorSubject } from 'rxjs';
@Injectable( )
export class ProductService {
    private productsUrl = 'api/products';
    private products!: ProductAPI[];

    private selectedProductSource = new BehaviorSubject<ProductAPI | null>(null);
    selectedProductChanges$ = this.selectedProductSource.asObservable();

    constructor(private http: HttpClient) { }

    changeSelectedProduct(selectedProduct: ProductAPI | null): void {
        this.selectedProductSource.next(selectedProduct);
    }

    getProducts(): Observable<ProductAPI[]> {
        if (this.products) {
            return of(this.products);
        }
        return this.http.get<ProductAPI[]>(this.productsUrl)
                        .pipe(
                            tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.products = data),
                        );
    }

    getProduct(id: number): Observable<ProductAPI> {

        if (this.products) {
            const foundItem = this.products.find(item => item.id === id);
            if (foundItem) {
                return of(foundItem);
            }
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<ProductAPI>(url)
                        .pipe(
                            tap(data => console.log('Data: ' + JSON.stringify(data))),

                        );
    }
}
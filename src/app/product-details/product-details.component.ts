import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import { Produit } from '../../Modeles/produit';
import { ProductDetailsService } from '../services/product-details.service';
import { AuthentificationService } from '../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf,CurrencyPipe,NgForOf,NgClass],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] 
})
export class ProductDetailsComponent implements OnInit {
  product!: Produit | null; // Use of non-null assertion is acceptable, but consider initialization
  mainImage!: string; // To hold the main image URL

  constructor(private productDetailsService: ProductDetailsService) { }

  ngOnInit(): void {
    this.getClickedProduct();
  }

  getClickedProduct(): void {
    this.productDetailsService.clickedProduct$.subscribe(data => {
      this.product = data;
      if (this.product) {
        this.mainImage = this.product.url; // Initialize main image
      }
    });
  }

  setMainImage(image: string): void {
    this.mainImage = image; // Method to change the main image
  }

  addToCart(): void {
    console.log('Product added to cart:', this.product);
  }


}

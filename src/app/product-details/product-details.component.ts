import { Component, OnInit } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { ProductDetailsService } from '../services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Produit;
  mainImage: string = '';

  constructor(
    private productDetailsService: ProductDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProductDetails();
  }

  private loadProductDetails(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductDetails(productId);
    }
  }

  private getProductDetails(id: string): void {
    this.productDetailsService.getProductById(id).subscribe(
      (data: Produit) => {
        this.product = data;
        this.mainImage = this.product.url[0]; // Set the first image as the main image
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  setMainImage(image: string): void {
    this.mainImage = image; // Change main image when an additional image is clicked
  }

  addToCart(): void {
    // Logic to add the product to the cart
    console.log('Product added to cart:', this.product);
  }
}

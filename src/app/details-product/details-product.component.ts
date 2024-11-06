import { Component, OnInit } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PanierService } from '../services/panier.service';
import { ProductDetailsService } from '../services/product-details.service';
import { CommonModule, CurrencyPipe, NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, CommonModule, NgStyle,RouterLink],
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent implements OnInit {
  produit?: Produit;

  constructor(
    private route: ActivatedRoute,
    private panierService: PanierService,
    private productDetailsService: ProductDetailsService
  ) {}

  ngOnInit(): void {
    // Subscribe to the clicked product in ProductDetailsService
    this.productDetailsService.clickedProduct$.subscribe((product) => {
      if (product) {
        this.produit = product;
      }
    });
  }

  addToCart(): void {
    if (this.produit) {
      this.panierService.addProductToCart(this.produit);
      console.log('Produit ajouté au panier:', this.produit);
    }
  }

  getState(stock: number): string {
    return stock > 0 ? 'En stock' : 'Rupture de stock';
  }

  getColor(stock: number): string {
    return stock > 0 ? 'green' : 'red';
  }
}

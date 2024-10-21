import { Component, Output } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
import { ProductDetailsService } from '../services/product-details.service';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgStyle, NgIf],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'] // Corrected from styleUrl to styleUrls
})
export class ProductItemComponent {
  constructor(private panierService: PanierService, private productDetailsService: ProductDetailsService, private router: Router) {}

  @Input() produit!: Produit;
  @Output() selectedProduct = new EventEmitter<Produit>();

  addToCart() {
    this.selectedProduct.emit(this.produit);
  }

  getState(stock: number): string {
    return stock > 0 ? "en stock" : "en rupture de stock";
  }

  getColor(stock: number): string {
    return stock > 0 ? "green" : "red"; 
  }

  onClickProduct() {
    // Émettre le produit cliqué
    this.productDetailsService.setSelectedProduct(this.produit);
    this.router.navigate(['/product-details']);
  }
}

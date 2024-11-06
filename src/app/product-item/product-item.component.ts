import { Component, Output } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgStyle, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../services/product-details.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgStyle, NgIf,CommonModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  constructor(
    private panierService: PanierService,
    private productDetailsService: ProductDetailsService,
    private router: Router
  ) {}


  @Input() produit!: Produit;
  @Output() selectedProduct = new EventEmitter<Produit>();

  addToCart(): void {
    this.selectedProduct.emit(this.produit);
    this.panierService.addProductToCart(this.produit); // Utiliser le service panier pour ajouter le produit au panier
    console.log('Produit ajouté au panier:', this.produit);
  }

  getState(stock: number): string {
    return stock > 0 ? 'en stock' : 'en rupture de stock';
  }

  getColor(stock: number): string {
    return stock > 0 ? 'green' : 'red';
  }

  onClickProduct(): void {
    this.productDetailsService.setClickedProduct(this.produit)
    this.router.navigate(['/product-details', this.produit.id]);
  
  }
}

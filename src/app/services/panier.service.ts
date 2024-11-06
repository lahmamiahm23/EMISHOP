import { Injectable } from '@angular/core';
import { Produit } from '../../Modeles/produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private produitsDansPanier: Produit[] = [];

  constructor() {}

  // Ajouter un produit au panier
  addProductToCart(produit: Produit): void {
    this.produitsDansPanier.push(produit);
    console.log('Produit ajouté au panier:', produit);
  }

  // Retirer un produit du panier
  removeProductFromCart(produit: Produit): void {
    const index = this.produitsDansPanier.indexOf(produit);
    if (index !== -1) {
      this.produitsDansPanier.splice(index, 1);
      console.log('Produit retiré du panier:', produit);
    }
  }

  // Récupérer tous les produits dans le panier
  getProductsInCart(): Produit[] {
    return this.produitsDansPanier;
  }

  // Vider le panier
  clearCart(): void {
    this.produitsDansPanier = [];
    console.log('Le panier a été vidé.');
  }

  // Obtenir le nombre de produits dans le panier
  getCartItemCount(): number {
    return this.produitsDansPanier.length;
  }
}


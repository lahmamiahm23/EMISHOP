import { Component, OnInit } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { NgFor, NgIf } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { LignePanier } from '../../Modeles/LignePanier';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PanierComponent } from '../panier/panier.component';
import { ProductService } from '../services/product.service';
import { ProductAPI } from '../../Modeles/product-api';

@Component({
  selector: 'app-listeproduit',
  standalone: true,
  imports: [NgFor, ProductItemComponent, NavBarComponent, NgIf, PanierComponent],
  templateUrl: './listeproduit.component.html',
  styleUrls: ['./listeproduit.component.scss'] // Fixed the typo here
})
export class ListeproduitComponent implements OnInit {

  detailProduit: LignePanier[] = [];
  displayPanier: boolean = false;
  productsAPI: Array<ProductAPI> = [];
  products: Array<Produit> = [];
  filteredProduits: Produit[] = []; // Initialize filtered products

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.productsAPI = data.products;
      this.products = [];

      this.productsAPI.forEach(p => {
        const prod = new Produit(p.id, p.title, p.images[0], p.price, p.category, p.description, p.stock);
        this.products.push(prod);
      });

      this.filteredProduits = [...this.products];
    });
    
  }

  onProductAdded(p: Produit): void {
    const existingProduct = this.detailProduit.find(item => item.produit.id === p.id);
    if (existingProduct) {
      existingProduct.qte++;
    } else {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = p;
      newLignePanier.qte = 1;
      this.detailProduit.push(newLignePanier);
    }
    console.log(this.detailProduit);
  }

  showPanier(e: boolean): void {
    this.displayPanier = e;
  }

  onSearch(searchKey: string): void {
    if (searchKey&& searchKey.trim() !== "") {
      this.filteredProduits = this.products.filter(product =>
        product.nom.toLowerCase().includes(searchKey.toLowerCase()) // Use product.title for filtering
      );
    } else {
      this.filteredProduits = [...this.products]; // Reset if search is empty
    }
    console.log(this.filteredProduits); // Log filtered products
  }

}

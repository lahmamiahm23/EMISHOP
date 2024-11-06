import { Component, OnInit } from '@angular/core';
import { Produit } from '../../Modeles/produit';
import { NgFor, NgIf } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { LignePanier } from '../../Modeles/LignePanier';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PanierComponent } from '../panier/panier.component';
import { ProductService } from '../services/product.service';
import { ProductAPI } from '../../Modeles/product-api';
import { CategoryService } from '../services/category.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-listeproduit',
  standalone: true,
  imports: [NgFor, NavBarComponent, NgIf, PanierComponent,ProductItemComponent],
  templateUrl: './listeproduit.component.html',
  styleUrls: ['./listeproduit.component.scss']
})
export class ListeproduitComponent implements OnInit {

  detailProduit: LignePanier[] = [];
  displayPanier: boolean = false;
  productsAPI: Array<ProductAPI> = [];
  products: Array<Produit> = [];
  filteredProduits: Produit[] = [];
  isSearchActive: boolean = false;
  selectedCategory: string | null = null;
  allProducts: Produit[] = [];
  categories: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private shareDataService: ShareDataService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.listenToCategoryChanges();
  }

  // Chargement des produits
  loadProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.productsAPI = data.products;
      this.products = this.productsAPI.map(p => 
        new Produit(p.id, p.title, p.images[0], p.price, p.category, p.description, p.stock,p.images)
      );
      this.filteredProduits = [...this.products]; // Initie le tableau filtré avec tous les produits
      this.allProducts = [...this.products]; // Sauvegarde de tous les produits pour réinitialisation
    }, error => {
      console.error("Erreur lors du chargement des produits:", error);
    });
  }

  // Chargement des catégories
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.error("Erreur lors du chargement des catégories:", error);
    });
  }

  // Écoute les changements de catégorie pour filtrer les produits
  listenToCategoryChanges(): void {
    this.shareDataService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category;
      this.showProductsByCategory();
    });
  }

  // Ajout d'un produit au panier
  onProductAdded(p: Produit): void {
    const existingProduct = this.detailProduit.find(item => item.produit.id === p.id);
    if (existingProduct) {
      existingProduct.qte++; // Incrémente la quantité si le produit est déjà dans le panier
    } else {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = p;
      newLignePanier.qte = 1;
      this.detailProduit.push(newLignePanier); // Ajoute une nouvelle ligne pour le produit
    }
    console.log(this.detailProduit); // Log du panier mis à jour
  }

  // Affichage du panier
  showPanier(e: boolean): void {
    this.displayPanier = e;
  }

  // Recherche de produits
  onSearch(searchKey: string): void {
    if (searchKey && searchKey.trim() !== "") {
      this.filteredProduits = this.products.filter(product =>
        product.nom.toLowerCase().includes(searchKey.toLowerCase())
      );
    } else {
      this.filteredProduits = [...this.products]; // Réinitialise si la recherche est vide
    }
    console.log(this.filteredProduits); // Log des produits filtrés
  }

  // Affichage des produits par catégorie
  showProductsByCategory(): void {
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      this.productService.getProduitByCategory(this.selectedCategory).subscribe((data: any) => {
        this.productsAPI = data.products;
        this.products = this.productsAPI.map(p => 
          new Produit(p.id, p.title, p.images[0], p.price, p.category, p.description, p.stock,p.images)
        );
      }, error => {
        console.error("Erreur lors du chargement des produits par catégorie:", error);
      });
    } else {
      this.products = [...this.allProducts]; // Réinitialise tous les produits si la catégorie est "All"
    }
  }

}

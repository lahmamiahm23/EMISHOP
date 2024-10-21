import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../Modeles/produit';
import { ProductAPI } from '../../Modeles/product-api';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgIf, FormsModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() panier!: boolean;
  searchKey: string | null = '';
  isSearchActive: boolean = false;
  selectedCategory: string | null = null;
  allProducts!: Produit[];
  products!: Produit[];
  productsAPI!: ProductAPI[];
  categories: any;

  @Output() panierSelected = new EventEmitter<boolean>();
  @Output() searchedText = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<string>();

  constructor(
    public authService: AuthentificationService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private shareDataService: ShareDataService
  ) {}

  ngOnInit(): void {
    // Récupérer les catégories au démarrage
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    }, error => {
      console.log(error);
    });

    // Gérer les mots-clés de recherche via le service partagé
    this.shareDataService.searchKeyword$.subscribe(data => {
      this.searchKey = data;
      if (this.searchKey && this.searchKey.trim() !== '') {
        this.onSearchByKey();
      }
    });
  }

  afficherPanier() {
    this.panier = !this.panier;
    this.panierSelected.emit(this.panier);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  onSearchByKey() {
    if (this.searchKey && this.searchKey.trim() !== '') {
      this.searchedText.emit(this.searchKey);
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onSelectCategory(category: string) {
    this.categorySelected.emit(category);
    this.shareDataService.setSelectedCategory(category);
  }
}

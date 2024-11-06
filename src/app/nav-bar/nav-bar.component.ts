import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../Modeles/produit';
import { ProductAPI } from '../../Modeles/product-api';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ShareDataService } from '../services/share-data.service';
import { AppComponent } from "../app.component";
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import {  inject } from '@angular/core';
import { User } from '@angular/fire/auth'; // Import User type


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgIf, FormsModule, CommonModule, AppComponent],
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
    
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private shareDataService: ShareDataService
  ) {}
    authService = inject(AuthService);
    http = inject(HttpClient);
  ngOnInit(): void {
    
    this.authService.user$.subscribe((user: User | null) => { // Specify User | null type
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {  
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  
  
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

  showCategoryDropdown: boolean = false;
  showSearch: boolean = false;

  toggleCategoryDropdown() {
    this.showCategoryDropdown = !this.showCategoryDropdown;
    // Close search if it's open
    if (this.showSearch) this.showSearch = false;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    // Close category dropdown if it's open
    if (this.showCategoryDropdown) this.showCategoryDropdown = false;
  }


  onSearchByKey() {
    if (this.searchKey && this.searchKey.trim() !== '') {
      this.searchedText.emit(this.searchKey);
    }
  }

  
  

  onSelectCategory(category: string) {
    this.categorySelected.emit(category);
    this.shareDataService.setSelectedCategory(category);
  }
  logout(): void {
this.authService.logout();
this.router.navigateByUrl('/home')
  }
  
}

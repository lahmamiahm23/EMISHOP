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
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.productsAPI = data.products;
        this.products = this.productsAPI.map((p: ProductAPI) => new Produit(
          p.id, p.title, p.images[0], p.price, p.category, 
          p.description, p.stock
        ));
        this.allProducts = [...this.products];
      },
      error => {
        console.log(error);
      }
    );

    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });

    this.shareDataService.selectedCategory$.subscribe(category => {
      if (category) {
        this.onCategorySelected(category);
      }
    });

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

  onCategorySelected(category: string | null) {
    
    this.selectedCategory = category;
    if (!this.selectedCategory || this.selectedCategory === 'All') {
      this.products = [...this.allProducts];
      return;
    }

    this.categorySelected.emit(this.selectedCategory);
    
    this.productService.getProductsByCategory(this.selectedCategory).subscribe(
      (data: any) => {
        this.products = data.products.map((p: ProductAPI) => new Produit(
          p.id, p.title, p.images[0], p.price, p.category, 
          p.description, p.stock
        ));
      },
      error => {
        console.log(error);
      }
    );
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}

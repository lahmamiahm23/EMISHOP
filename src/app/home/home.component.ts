import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { user, User } from '@angular/fire/auth'; // Importation de User
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgClass, CommonModule, RouterLink, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  // Définition des sections de la page d'accueil
  sections = [
    { name: 'Products', description: 'Explore our product catalog', routerLink: '/products', icon: 'box-seam' },
    { name: 'EmiShop', description: 'Discover the EmiShop experience', routerLink: '/emishop', icon: 'shop' },
    { name: 'About Us', description: 'Learn more about us', routerLink: '/about', icon: 'info-circle' },
    { name: 'Panier', description: 'View your shopping cart', routerLink: '/cart', icon: 'cart' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) => { // Spécification du type ici
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

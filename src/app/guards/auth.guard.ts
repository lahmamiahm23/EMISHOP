import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('user');  // Remplacez cette logique si vous avez un service d'authentification
    
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirige vers la page de login si non connecté
      return false;
    }
  }
}

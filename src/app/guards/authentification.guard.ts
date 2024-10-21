import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

export const authentificationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthentificationService);  // Injecter le service d'authentification
  const router = inject(Router);  // Injecter le routeur

  // Vérifiez si l'utilisateur est authentifié
  if (authService.isAuthenticated()) {
    return true;  // Accès autorisé
  } else {
    // Redirection vers la page de connexion si non authentifié
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};

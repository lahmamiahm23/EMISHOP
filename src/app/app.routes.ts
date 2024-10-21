import { Routes } from '@angular/router';
import { ListeproduitComponent } from './listeproduit/listeproduit.component';
import { PanierComponent } from './panier/panier.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authentificationGuard } from './guards/authentification.guard';
import { PaymentComponent } from './payment/payment.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pay', component: PaymentComponent },
  { path: 'products', component: ListeproduitComponent, canActivate: [authentificationGuard] },  // Protéger la route des produits
  { path: 'panier', component: PanierComponent , canActivate: [authentificationGuard] },  // Protéger le panier
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: '/home' }  // Route pour les URL non trouvées
];

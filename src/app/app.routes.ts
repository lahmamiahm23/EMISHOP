import { Routes } from '@angular/router';
import { ListeproduitComponent } from './listeproduit/listeproduit.component';
import { PanierComponent } from './panier/panier.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { LogicComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductItemComponent } from './product-item/product-item.component';
import { DetailsProductComponent } from './details-product/details-product.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pay', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ListeproduitComponent },  // Route protégée par AuthGuard
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },  // Route protégée par AuthGuard
  { path: 'register', component: RegisterComponent },
  { path: 'product-details/:id', component: DetailsProductComponent},
  { path: 'login', component: LogicComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/home' }
];

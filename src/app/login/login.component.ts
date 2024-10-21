import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { AuthentificationService } from '../services/authentification.service';
import { AppUser } from '../../Modeles/user.model';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userFormGroup!: FormGroup;
  errormessage: string = ""; 
  loading: boolean = false;  

  constructor(
    private fb: FormBuilder, 
    private authService: AuthentificationService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username: this.fb.control("", Validators.required),  // Ajout d'un validateur pour le nom d'utilisateur
      password: this.fb.control("", Validators.required)   // Ajout d'un validateur pour le mot de passe
    });
  }

  handleLogin() {
    this.loading = true;  // Activer l'indicateur de chargement
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
  
    this.authService.login(username, password).subscribe({
      next: (appUser: AppUser) => {
        this.authService.authentificateUser(appUser).subscribe({
          next: () => {
            this.loading = false;  // Désactiver le chargement après la réussite
            console.log("Authentification réussie, redirection...");
            this.router.navigateByUrl("/products");  // Redirection après authentification
          },
          error: (err) => {
            this.loading = false;  // Désactiver le chargement en cas d'erreur
            console.error("Erreur lors de l'authentification :", err);
            this.errormessage = err.message;
          }
        });
      },
      error: (err) => {
        this.loading = false;  // Désactiver le chargement en cas d'erreur
        console.error("Login échoué :", err);
        this.errormessage = "Login ou mot de passe incorrect";  // Affiche un message d'erreur clair
      }
    });
  }
}
import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf,FormsModule,RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authentificationService: AuthentificationService, private router: Router) {}

  onSignUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.authentificationService.login('user1',"1234");
    this.router.navigate(['/products']);
  }


}

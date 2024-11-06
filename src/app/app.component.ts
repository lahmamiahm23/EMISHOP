import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeproduitComponent } from "./listeproduit/listeproduit.component";
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseAppModule } from '@angular/fire/app';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, HttpClientModule, FirebaseAppModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  http = inject(HttpClient);
  

}

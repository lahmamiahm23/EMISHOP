import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeproduitComponent } from "./listeproduit/listeproduit.component";
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListeproduitComponent,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 
}

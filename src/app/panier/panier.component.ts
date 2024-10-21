import { Component } from '@angular/core';
import { LignePanier } from '../../Modeles/LignePanier';
import { Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgFor],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit{
  @Input() detailsPanier! :LignePanier[];
  ngOnInit(): void {
    console.log("je suis dans panier",this.detailsPanier);
  }
  get totalPrice(): number {
    return this.detailsPanier.reduce((acc, item) => acc + (item.qte * item.produit.prix), 0);
}
}

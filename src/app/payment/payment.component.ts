// payment.component.ts
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './payment.component.html'
})
export class PaymentComponent {
  paymentMethod: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardHolderName: string = '';

  onPay() {
    if (this.paymentMethod === 'creditCard') {
      // Handle credit card payment logic
      console.log('Processing credit card payment...');
    } else if (this.paymentMethod === 'paypal') {
      // Redirect to PayPal or handle PayPal payment logic
      console.log('Redirecting to PayPal...');
    }
  }
}

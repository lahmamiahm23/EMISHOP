import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBj7xk319tY1VB9V5UUOK_PHpWT7-6G7Oc",
  authDomain: "emishop-1068f.firebaseapp.com",
  projectId: "emishop-1068f",
  storageBucket: "emishop-1068f.appspot.com",
  messagingSenderId: "360840662062",
  appId: "1:360840662062:web:923769a645cfe1932923bf"
};

// Configuration de l'application
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()) // Ajouter Firestore
  ]
};

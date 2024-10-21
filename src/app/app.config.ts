import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
const firebaseConfig = {
  apiKey: "AIzaSyCec0RXB-OH-gf6lyvQXF3S4YdJ_MX2AoM",
  authDomain: "emishop-e00f2.firebaseapp.com",
  projectId: "emishop-e00f2",
  storageBucket: "emishop-e00f2.appspot.com",
  messagingSenderId: "600377032287",
  appId: "1:600377032287:web:cd075a06186cbbfc3aa5ea",
  measurementId: "G-EHGJB40H5N"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient()]
     
};

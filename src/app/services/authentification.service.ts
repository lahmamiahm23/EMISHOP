import { Injectable } from '@angular/core';
import { AppUser } from '../../Modeles/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private users: AppUser[] = [];
  private authentificatedUser: AppUser | undefined = undefined;
  private userSubject = new BehaviorSubject<AppUser | undefined>(undefined); // Initialisé à undefined

  constructor() {
    // Initialisation des utilisateurs avec des UUID uniques
    this.users.push({ userId: UUID.UUID(), username: "user1", password: "1234", roles: ["USER"] });
    this.users.push({ userId: UUID.UUID(), username: "user2", password: "12234", roles: ["USER"] });
    this.users.push({ userId: UUID.UUID(), username: "user3", password: "1234", roles: ["USER"] });
  }

  public login(username: string, password: string): Observable<AppUser> {
    const appUser = this.users.find(u => u.username === username);
    if (!appUser) {
      return throwError(() => new Error("User not found"));
    }
    if (appUser.password !== password) {
      return throwError(() => new Error("Password incorrect"));
    }
    return of(appUser);
  }

  public authentificateUser(appUser: AppUser): Observable<boolean> {
    this.authentificatedUser = appUser;
    this.userSubject.next(appUser); // Mettre à jour le sujet avec l'utilisateur authentifié
    localStorage.setItem("authUser", JSON.stringify({
      username: appUser.username,
      roles: appUser.roles,
      jwt: "JWT_TOKEN"
    }));
    return of(true);
  }

  public hasRole(role: string): boolean {
    return this.authentificatedUser?.roles.includes(role) ?? false;
  }

  public logout(): void {
    this.authentificatedUser = undefined;
    this.userSubject.next(undefined); 
    localStorage.removeItem("authUser");
  }

  public getUser(): Observable<AppUser | undefined> {
    return this.userSubject.asObservable();
  }
  public isAuthenticated(): boolean {
    console.log("Utilisateur est authentifié ?", this.authentificatedUser != undefined);  // Debugging
    return this.authentificatedUser != undefined;
  }
}

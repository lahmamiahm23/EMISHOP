import { Injectable , inject, signal} from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { Observable } from "rxjs";
import { from } from "rxjs";
import { user } from "@angular/fire/auth";
import { UserInterface } from "./user.interface";
@Injectable({
providedIn : 'root'
})
export class AuthService{
    firebaseAuth = inject(Auth);
    user$  = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined)
    registre(email: string , username : string , password: string ):Observable<void>{
    const promise = createUserWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password,
    ).then((Response) =>
        updateProfile(Response.user,{displayName:username}),
       ); 
       return from(promise);
    }
    login( email : string , password: string):Observable<void>{
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
        ).then(()=> {});
        return from(promise);
}
    logout() : Observable<void>{
const promise = signOut(this.firebaseAuth);
return from(promise);
}
}
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;
  public user: User;

  constructor(public auth: AngularFireAuth) {
    this.user$ = auth.user;
    auth.user.subscribe(value => {
      this.user = value;
    })
  }

  anonymousLogin() {
    this.auth.signInAnonymously().then(() => {
      console.log('logged in');
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
    });
  }
}

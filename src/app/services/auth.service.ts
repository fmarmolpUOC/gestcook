import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup ( new firebase.auth.GoogleAuthProvider() );
  }

  getAuth() {
   return this.afAuth.authState.map(auth => auth);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }


}

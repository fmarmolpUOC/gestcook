import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection: AngularFirestoreCollection<UserInterface>;
  userDoc: AngularFirestoreDocument<UserInterface>;
  users: Observable<UserInterface[]>;
  usr: Observable<UserInterface>;

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private url: '';

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) {

      this.userCollection = this.afs.collection('users', ref => ref); // ordereds recipes

      this.user = afAuth.authState;
      this.user.subscribe(
              (user) => {
                if (!user) {
                  this.userDetails = user;
                  const id = this.userDetails.uid;
                  const email = this.userDetails.email;
                  const photoUrl = this.userDetails.photoURL;
                  console.log(this.userDetails);
                  console.log('URL :', this.userDetails.photoURL);
                  this.updateUserGoogleData(id, email, photoUrl);
                } else {
                  this.userDetails = null;
                }
              }
            );
     }

  /*registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }*/


  registerUser(email: string, password: string, url: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user, url);
        }).catch(err => console.log(reject(err)));
    });
  }

  private updateUserData(user, url) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      photoUrl: url,

      name: '',
      surname: '',
      street: '',
      number: '',
      cp: '',
      town: '',
      province: '',
      state: 'España',
    };
    console.log(user.id, user.email, user.photoUrl);
    return userRef.set(data, { merge: true });
  }

    loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData => resolve(userData),
      err => reject(err));
    });
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup ( new firebase.auth.GoogleAuthProvider() );
  }

  private updateUserGoogleData(id, email, photoUrl) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${id}`);
    const data: UserInterface = {
      id: id,
      email: email,
      photoUrl: photoUrl,
      name: '',
      surname: '',
      street: '',
      number: '',
      cp: '',
      town: '',
      province: '',
      state: 'España',
    };
    console.log(id, email, photoUrl);
    return userRef.set(data, { merge: true });
  }

  getAuth() {
   return this.afAuth.authState.map(auth => auth);
  }

  getOneUser(idUserLogged: string) {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUserLogged}`);
    this.usr = this.userDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.usr;
   }

   updateUser(usr: UserInterface) {
    this.userDoc = this.afs.doc(`users/${usr.id}`);
    this.userDoc.update(usr);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }


}

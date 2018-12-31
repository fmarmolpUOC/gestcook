import { Injectable } from '@angular/core';
import { FavoriteInterface } from '../interfaces/favorite';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoriteCollection: AngularFirestoreCollection<FavoriteInterface>;
  favoriteDoc: AngularFirestoreDocument<FavoriteInterface>;
  favorites: Observable<FavoriteInterface[]>;
  favorite: Observable<FavoriteInterface>;

  menus: Observable<FavoriteInterface[]>;
  menu: Observable<FavoriteInterface>;


  constructor(
    private afs: AngularFirestore,
  ) { }


  getAllFavorites(idUserLogged: string): Observable<FavoriteInterface[]> {
    this.favorites = this.afs.collection(idUserLogged).snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as FavoriteInterface;
          data.recip = action.payload.doc.id;
          return data;
        });
    });
  return this.favorites;
 }

 getAllMenu(idUserLogged: string, idTimestamp: any): Observable<FavoriteInterface[]> {
  this.menus = this.afs.collection(idUserLogged + idTimestamp).snapshotChanges()
    .map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as FavoriteInterface;
        data.recip = action.payload.doc.id;
        return data;
      });
  });
return this.menus;
}



}

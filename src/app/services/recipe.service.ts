import { Injectable } from '@angular/core';
import { RecipeInterface } from '../interfaces/recipe';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeCollection: AngularFirestoreCollection<RecipeInterface>;
  recipeMyCollection: AngularFirestoreCollection<RecipeInterface>;
  recipeDoc: AngularFirestoreDocument<RecipeInterface>;
  recipes: Observable<RecipeInterface[]>;
  recipe: Observable<RecipeInterface>;

    constructor(
      private afs: AngularFirestore) {
        this.recipeCollection = this.afs.collection('recipes', ref => ref.orderBy('publicationDate', 'desc')); // to load all recipes
      }

  // To add recipes into the collection of recipes
  addNewRecipe(recipe: RecipeInterface) {
    this.recipeCollection.add(recipe);
   }

  getAllRecipes(): Observable<RecipeInterface[]> {
    this.recipes = this.recipeCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as RecipeInterface;
          data.id = action.payload.doc.id;
          return data;
        });
    });
  return this.recipes;
 }

 getAllUserRecipes(userEmail: string): Observable<RecipeInterface[]> {
  this.recipes = this.recipeCollection.snapshotChanges()
    .map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as RecipeInterface;
        data.id = action.payload.doc.id;
        return data;
      });
  });
return this.recipes;
}

 getOneRecipe(idRecipe: string) {
  this.recipeDoc = this.afs.doc<RecipeInterface>(`recipes/${idRecipe}`);
  this.recipe = this.recipeDoc.snapshotChanges().map(action => {
    if (action.payload.exists === false) {
      return null;
    } else {
      const data = action.payload.data() as RecipeInterface;
      data.id = action.payload.id;
      return data;
    }
  });
  return this.recipe;
 }

 updateRecipe(recipe: RecipeInterface) {
   this.recipeDoc = this.afs.doc(`recipes/${recipe.id}`);
   this.recipeDoc.update(recipe);
 }
 deleteRecipe(recipe: RecipeInterface) {
  this.recipeDoc = this.afs.doc(`recipes/${recipe.id}`);
  this.recipeDoc.delete();
 }

}

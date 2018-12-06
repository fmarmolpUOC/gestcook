import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from '../../services/auth.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import * as Lodash from 'lodash';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {

  recipes: RecipeInterface[];

  userEmail: string;

  searchText: string = '';

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService
    ) { }

  ngOnInit() {
    this.isUserLogged();
    this.allRecipes();
  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.userEmail = user.email;
        console.log(this.userEmail);
      }
    });
  }

  allRecipes() {
    this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
  }

  filterCondition(recipe) {
    return recipe.userEmail.toLowerCase().indexOf(this.userEmail.toLowerCase()) !== -1;
  }

  filterSearchCondition(recipe) {
    return recipe.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

}

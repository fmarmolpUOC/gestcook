import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { FavoriteInterface } from '../../interfaces/favorite';
import { FavoriteService } from '../../services/favorite.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-menu-recipes',
  templateUrl: './menu-recipes.component.html',
  styleUrls: ['./menu-recipes.component.css']
})
export class MenuRecipesComponent implements OnInit {

  recipes: RecipeInterface[];
  favorites: FavoriteInterface[];

  recipe: RecipeInterface = {
    id: '',
    title: '',
    description: '',
    preparation: '',
    ingredients: '',
    publicationDate: '',
    userId: '',
    userEmail: '',
    imageUrl: '',
    userFavorite: Array[''],
  };

  favoritesUser: FavoriteInterface = {
    recip: '',
    us: '',
    publicationAdded: '',
  };

  idRecipe: string;
  idUser: string;
  idDate: '';
  idUserLogged: string;
  id: string;
  us: string;
  userEmail: string;

  constructor(
    private recipeService: RecipeService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    ) { }

  searchText: string = '';

  ngOnInit() {
    this.isUserLogged();
    this.allRecipes();
    this.getIdDate();
  }

  getIdDate() {
    this.idDate = this.route.snapshot.params['id'];
    console.log(this.idDate);

  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
        this.userEmail = user.email;
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

 addToMenu(event) {
  this.idRecipe = (event.target as Element).id;
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.favoritesUser.recip = this.idRecipe;
        this.idUserLogged = user.uid;
        this.favoritesUser.us = this.idUserLogged;
        this.favoritesUser.publicationAdded = (new Date()).getTime();
        console.log(this.favoritesUser.recip);
        console.log(this.favoritesUser.us);
        this.afs.collection(this.idUserLogged + this.idDate).doc(this.idRecipe).set(this.favoritesUser);
    }
  });
  this.router.navigate(['/menu_date/' + this.idDate]);
}

}

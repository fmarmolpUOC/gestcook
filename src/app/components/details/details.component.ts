import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { FavoriteInterface } from '../../interfaces/favorite';
import { FavoriteService } from '../../services/favorite.service';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  idRecipe: string;
  idUserLogged: string;
  idUserLoggedEmail: string;
  idUser: string;
  admin: string;
  id: string;

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
    imageUrl: ''
  };

  favoritesUser: FavoriteInterface = {
    recip: '',
    us: '',
    publicationAdded: '',
  };

  hideme = {};

  constructor(
    private recipeService: RecipeService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    ) { 
      this.hideme = {};
    }

  ngOnInit() {
    this.isUserLogged();
    this.getRecipeDetails();
    this.allFavorites();
  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLoggedEmail = user.email;
        this.idUser = user.uid;
        this.admin = 'gestcook.0@gmail.com';
        console.log(this.idUserLoggedEmail);
      }
    });
  }

  getRecipeDetails() {
    this.idRecipe = this.route.snapshot.params['id'];
    this.recipeService.getOneRecipe(this.idRecipe).subscribe(recipe => this.recipe = recipe);
  }

  onClickDelete() {
    if (confirm('Estás seguro que quieres eliminar la receta?')) {
      this.recipeService.deleteRecipe(this.recipe);
      this.router.navigate(['/home']);
    }
  }

  allFavorites() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
        this.favoriteService.getAllFavorites(this.idUserLogged).subscribe(favorites => this.favorites = favorites);
      }
    });
 }

 onClickAddFavorite(event) {
  this.idRecipe = (event.target as Element).id;
  this.authService.getAuth().subscribe( user => {
    if (user) {
      this.favoritesUser.recip = this.idRecipe;
      this.idUserLogged = user.uid;
      this.favoritesUser.us = this.idUserLogged;
      this.favoritesUser.publicationAdded = (new Date()).getTime();
      console.log(this.favoritesUser.recip);
      console.log(this.favoritesUser.us);
      this.afs.collection(this.idUserLogged).doc(this.idRecipe).set(this.favoritesUser);
    }
  });
  this.router.navigate(['/favorites']);
}



}

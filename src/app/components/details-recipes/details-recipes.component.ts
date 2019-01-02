import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { FavoriteInterface } from '../../interfaces/favorite';
import { FavoriteService } from '../../services/favorite.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-recipes',
  templateUrl: './details-recipes.component.html',
  styleUrls: ['./details-recipes.component.css']
})
export class DetailsRecipesComponent implements OnInit {

  idRecipe: string;
  idUserLogged: string;
  idUser: string;
  count = 0;
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
    private location: Location,
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
        this.idUserLogged = user.email;
        this.idUser = user.uid;
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
      this.router.navigate(['/recipes']);
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

 onClickDeleteFavorite(event) {
  this.idRecipe = (event.target as Element).id;
  this.authService.getAuth().subscribe( user => {
    if (user) {
      this.idUserLogged = user.uid;
      this.afs.collection(this.idUserLogged).doc(this.idRecipe).delete();
    }
  });
  this.router.navigate(['/favorites']);
}

goBack() {
  this.location.back();
}



}

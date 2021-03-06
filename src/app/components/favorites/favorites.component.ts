import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { FavoriteInterface } from '../../interfaces/favorite';
import { FavoriteService } from '../../services/favorite.service';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

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

  favorite: FavoriteInterface = {
    recip: '',
    us: '',
  };

  idRecipe: string;
  idUser: string;
  idUserLogged: string;
  id: string;
  us: string;
  count = 0;

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
    this.allFavorites();
  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
      }
    });
  }

  filterCondition(recipe) {
    return recipe.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

  allRecipes() {
    this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
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

}

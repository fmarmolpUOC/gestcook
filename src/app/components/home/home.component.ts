import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UserInterface } from '../../interfaces/user';
import { auth } from 'firebase/app';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FavoriteInterface } from '../../interfaces/favorite';
import { FavoriteService } from '../../services/favorite.service';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

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

  user: UserInterface = {
    id: '',
  name: '',
  email: '',
  password: '',
  photoUrl: '',
  };

  users: UserInterface[];

  usr: UserInterface = {
    id: '',
    email: '',
    password: '',
    photoUrl: '',
    name: '',
    surname: '',
    street: '',
    number: '',
    cp: '',
    town: '',
    province: '',
    state: 'España',
    phone: '',
  };

  idRecipe: string;
  idUserLogged: string;
  id: string;
  us: string;
  sIndex: number = null;

  hideme = {};

  favoritesUser: FavoriteInterface = {
    recip: '',
    us: '',
    publicationAdded: '',
  };


  constructor(
    private recipeService: RecipeService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    ) {
      this.hideme = {};
    }

  searchText: string = '';

  public show: boolean = false;
  public buttonName: any = 'Show';


  ngOnInit() {
    this.isUserLogged();
    this.allRecipes();
    this.allUsers();
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

  allUsers() {
    this.authService.getAllUsers().subscribe(users => this.users = users);
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

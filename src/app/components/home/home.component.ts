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



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes: RecipeInterface[];

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
  idUser: string;
  idUserLogged: string;
  id: string;
  us: string;
  count = 0;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute
    ) { }

  searchText: string = '';


  ngOnInit() {
    this.isUserLogged();
    this.allRecipes();
    this.allUsers();
  }


  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
      }
    });
  }

  /*getUserDetails(id: string) {
    this.authService.getOneUser(id).subscribe(usr => this.usr = usr);
    console.log('Id: ', this.id);
  }*/

  filterCondition(recipe) {
    return recipe.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

  allRecipes() {
    this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
  }

  allUsers() {
    this.authService.getAllUsers().subscribe(users => this.users = users);
  }


  /*addOnFavorites(event) {
    const id: string = (event.target as Element).id;
    const us = this.idUserLogged;
    this.count =  1;
    console.log(id, us);
  }

  deleteOnFavorites(event) {
    this.count =  0;
    // console.log(this.count);
  }*/

}

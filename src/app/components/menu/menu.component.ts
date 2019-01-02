import { Component, OnInit, ViewEncapsulation, Inject, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  skillForm: FormGroup;
  public dateValue: Date = new Date();
  idTimestamp: any;
  idTimestampMenu: any;
  idDate: '';
  idUserLogged: string;
  idRecipe: string;
  

  recipes: RecipeInterface[];
  menus: FavoriteInterface[];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.isUserLogged();
    this.allRecipes();
    //this.allMenu();
    //this.callMenu();
  }

  createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
}

allRecipes() {
  this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
}

callMenu(menuDate) {
  const dateMenu = menuDate;
  this.idTimestampMenu = (new Date(dateMenu)).getTime();
  console.log(this.idTimestampMenu);
  this.allMenu();
}

addRecipeToMenu(date) {
  const id = date;
  this.idTimestamp = (new Date(id)).getTime();
  console.log(this.idTimestamp);
  this.router.navigate(['/menu_recipes/' + this.idTimestamp]);
}

addRecipeToMenu2(date) {
    const id = date;
    this.idTimestamp = (new Date(id)).getTime();
    console.log(this.idTimestamp);
    this.router.navigate(['/menu_favorites/' + this.idTimestamp]);
  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
      }
    });
  }

  allMenu() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
        this.favoriteService.getAllMenu(this.idUserLogged, this.idTimestampMenu).subscribe(menus => this.menus = menus);
      }
    });
  }

  onClickDeleteMenu(event) {
    this.idRecipe = (event.target as Element).id;
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
        this.afs.collection(this.idUserLogged + this.idTimestampMenu).doc(this.idRecipe).delete();
      }
    });
  }

}

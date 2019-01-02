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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-menu-date',
  templateUrl: './menu-date.component.html',
  styleUrls: ['./menu-date.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuDateComponent implements OnInit {

  skillForm: FormGroup;
  public dateValue: Date = new Date();
  idTimestamp: any;
  idTimestampMenu: any;
  timestampToDate: any;
  timestampToDate2: any;
  idDate: '';
  idDate2: '';
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
    this.allMenu();
    this.getIdDate();
  }

  getIdDate() {
    this.idDate = this.route.snapshot.params['id'];
    console.log(this.idDate);
    const toDate = new DatePipe('en-US');
    this.timestampToDate2 = toDate.transform(this.idDate, 'dd/MM/yy');
    this.timestampToDate = this.idDate;
    console.log(this.timestampToDate);

  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
      }
    });
  }

  createForm(): void {
    this.skillForm = this.fb.group({
        date: ['', Validators.required]
    });
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
      this.router.navigate(['/menu_favorites/' + this.idTimestamp]);
    }

  addRecipeToMenu2() {
    console.log(this.timestampToDate);
    this.router.navigate(['/menu_favorites/' + this.timestampToDate]);
    }

allRecipes() {
  this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
}

allMenu() {
  this.authService.getAuth().subscribe( user => {
    if (user) {
      this.idUserLogged = user.uid;
      this.favoriteService.getAllMenu(this.idUserLogged, this.idDate).subscribe(menus => this.menus = menus);
    }
  });
}

  onClickDeleteMenu(event) {
    this.idRecipe = (event.target as Element).id;
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.uid;
        this.afs.collection(this.idUserLogged + this.idDate).doc(this.idRecipe).delete();
      }
    });
  }

}

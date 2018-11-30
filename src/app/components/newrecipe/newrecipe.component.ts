import { Component, OnInit } from '@angular/core';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-newrecipe',
  templateUrl: './newrecipe.component.html',
  styleUrls: ['./newrecipe.component.css']
})
export class NewrecipeComponent implements OnInit {
  recipe: RecipeInterface = {
    id: '',
    title: '',
    description: '',
    preparation: '',
    ingredients: '',
    season: '',
    publicationDate: '',
    userId: '',
    userEmail: '',
  };

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onGuardarReceta({value}: {value: RecipeInterface}) {
    value.publicationDate = (new Date()).getTime();
    this.authService.getAuth().subscribe( user => {
      value.userId = user.uid;
      value.userEmail = user.email;
      this.recipeService.addNewRecipe(value);
    });
    this.router.navigate(['/recipes']);
  }

}


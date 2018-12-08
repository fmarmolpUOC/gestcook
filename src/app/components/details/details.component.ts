import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  idRecipe: string;
  idUserLogged: string;

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

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.isUserLogged();
    this.getRecipeDetails();
  }

  isUserLogged() {
    this.authService.getAuth().subscribe( user => {
      if (user) {
        this.idUserLogged = user.email;
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

}

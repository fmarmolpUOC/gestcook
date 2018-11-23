import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  idRecipe: string;
  recipe: RecipeInterface = {
    id: '',
    title: '',
    description: '',
    preparation: '',
    ingredients: '',
    season: '',
    publicationDate: '',
    userId: '',
    userName: ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
    ) { }

  ngOnInit() {
    this.getDetallesReceta();
  }

  getDetallesReceta() {
    this.idRecipe = this.route.snapshot.params['id'];
    this.recipeService.getOneRecipe(this.idRecipe).subscribe( recipe => this.recipe = recipe);
  }

  onModificarReceta({value}: {value: RecipeInterface}) {
    value.id = this.idRecipe;
    this.recipeService.updateRecipe(value);
    this.router.navigate(['/details/' + this.idRecipe]);
  }

}

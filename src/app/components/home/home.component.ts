import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes: RecipeInterface[];

  constructor(
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.allRecipes();
  }

  allRecipes() {
    this.recipeService.getAllRecipes().subscribe(recipes => this.recipes = recipes);
  }

}

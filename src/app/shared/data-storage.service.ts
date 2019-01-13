import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../components/recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-e0b40.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {observe: 'body'});
  }

  getRecipes() {
    this.http.get<Recipe[]>('https://ng-recipe-book-e0b40.firebaseio.com/recipes.json')
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipe(recipes);
        }
      );
  }
}

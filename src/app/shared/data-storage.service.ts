import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../components/recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private dataStorageUrl = 'https://ng-recipe-book-e0b40.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    // return this.http.put('https://ng-recipe-book-e0b40.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     // params: new HttpParams('auth', token)
    //   });
    const request = new HttpRequest('PUT', this.dataStorageUrl,
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.http.request(request);
  }

  getRecipes() {
    this.http.get<Recipe[]>(this.dataStorageUrl)
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipe(recipes);
        }
      );
  }
}

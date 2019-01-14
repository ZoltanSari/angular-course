import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../components/recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private dataStorageUrl = 'https://ng-recipe-book-e0b40.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put(this.dataStorageUrl + '?auth=' + token,
      this.recipeService.getRecipes(),
      {
        observe: 'body',
        // params: new HttpParams('auth', this.token)
      });
    // const request = new HttpRequest('PUT', this.dataStorageUrl,
    //   this.recipeService.getRecipes(), {reportProgress: true});
    // return this.httpClient.request(request);
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>(this.dataStorageUrl + '?auth=' + token).pipe(
      map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipe(recipes);
        }
      );
  }
}

import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 24),
    new Ingredient('Tomatoes', 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (const ingredient of ingredients) {
    //   this.addNewIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChange.next(ingredients.slice());
  }

  updateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChange.next(this.ingredients.slice());
  }
}

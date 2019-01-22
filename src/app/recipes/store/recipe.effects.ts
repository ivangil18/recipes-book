import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipeReducers from '../store/recipe.reducers';
import { Recipe } from '../recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipeReducers.State>
  ) {}

  @Effect()
  recipeFetch = this.actions$.ofType(RecipeActions.FETCH_RECIPES).pipe(
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(
        'https://ng-course-project-9992d.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json'
        }
      );
    }),
    map(recipes => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  );

  @Effect({ dispatch: false })
  recipeStore = this.actions$.ofType(RecipeActions.STORE_RECIPES).pipe(
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        'https://ng-course-project-9992d.firebaseio.com/recipes.json',
        state['recipes'],
        { reportProgress: true }
      );
      return this.httpClient.request(req);
    })
  );
}

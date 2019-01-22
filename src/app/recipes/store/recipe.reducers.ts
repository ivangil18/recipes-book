import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromAppStore from '../../store/app.reducers';

export interface RecipeState extends fromAppStore.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Congris',
      'This is a cuban recipe',
      'https://www.dcubanos.com/rinconcuba/wp-content/uploads/2009/04/arroz-congr%C3%AD-400x268.jpg',
      [new Ingredient('rice', 10), new Ingredient('Black beans', 5)]
    ),

    new Recipe(
      'Burguer',
      'This is a good one!',
      'http://www.falobe.com/54-large_default/junior.jpg',
      [new Ingredient('bread', 2), new Ingredient('meat', 10)]
    )
  ]
};

const newRecipes = [
  new Recipe(
    'Sopa',
    'This is a cuban recipe',
    'https://www.dcubanos.com/rinconcuba/wp-content/uploads/2009/04/arroz-congr%C3%AD-400x268.jpg',
    [new Ingredient('rice', 10), new Ingredient('Black beans', 5)]
  ),

  new Recipe(
    'Frijoles',
    'This is a good one!',
    'http://www.falobe.com/54-large_default/junior.jpg',
    [new Ingredient('bread', 2), new Ingredient('meat', 10)]
  )
];

export function RecipeReducers(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      console.log(action.payload);
      console.log(action.payload['recipes']);
      return { ...state, recipes: [...action.payload] };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = { ...recipe, ...action.payload.updatedRecipe };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}

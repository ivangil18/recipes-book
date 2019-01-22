import * as fromAuthReducers from '../auth/store/auth.reducers';
import * as fromShoppingListReducers from '../shopping-list/store/shopping-list.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingListReducers.State;
  auth: fromAuthReducers.State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListReducers.ShoppingListReducer,
  auth: fromAuthReducers.AuthReducers
};

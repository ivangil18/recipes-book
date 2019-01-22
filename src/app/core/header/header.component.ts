import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAppStore from '../../store/app.reducers';
import * as fromAuthReducers from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuthReducers.State>;

  constructor(
    private store: Store<fromAppStore.AppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetch() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.LogoutUser());
  }
}

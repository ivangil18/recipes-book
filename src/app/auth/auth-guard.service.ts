import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAppStore from '../store/app.reducers';
import * as fromAuthReducer from './store/auth.reducers';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private store: Store<fromAppStore.AppState>) {}

  canLoad(route: Route) {
    return this.store.select('auth').pipe(
      map((authState: fromAuthReducer.State) => {
        return authState.authenticated;
      })
    );
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuthReducer.State) => {
        return authState.authenticated;
      })
    );
  }
}

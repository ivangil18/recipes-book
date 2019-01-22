import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAppStore from '../store/app.reducers';
import * as fromAuthReducers from '../auth/store/auth.reducers';
import { switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAppStore.AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: fromAuthReducers.State) => {
        const copiedReq = request.clone({
          params: request.params.set('auth', authState.token)
        });
        return next.handle(copiedReq);
      })
    );
  }
}

import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from '../store/auth.actions';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  @Effect()
  signup = this.action$.ofType(AuthActions.TRY_SIGNUP).pipe(
    map((action: AuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: { username: string; password: string }) => {
      return from(
        firebase
          .auth()
          .createUserWithEmailAndPassword(authData.username, authData.password)
      );
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      return [
        { type: AuthActions.SIGNUP_USER },
        { type: AuthActions.SET_TOKEN, payload: token }
      ];
    })
  );

  @Effect()
  signin = this.action$.ofType(AuthActions.TRY_SIGNIN).pipe(
    map((action: AuthActions.TrySingin) => {
      return action.payload;
    }),
    switchMap((authData: { username: string; password: string }) => {
      return from(
        firebase
          .auth()
          .signInWithEmailAndPassword(authData.username, authData.password)
      );
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        { type: AuthActions.SIGNIN_USER },
        { type: AuthActions.SET_TOKEN, payload: token }
      ];
    })
  );

  @Effect({ dispatch: false })
  logout = this.action$.ofType(AuthActions.LOGOUT_USER).pipe(
    tap(() => {
      this.router.navigate(['/']);
      firebase.auth().signOut();
    })
  );

  constructor(private action$: Actions, private router: Router) {}
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAppStore from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<fromAppStore.AppState>) {}

  ngOnInit() {}

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(
      new AuthActions.TrySingin({ username: email, password: password })
    );
  }
}

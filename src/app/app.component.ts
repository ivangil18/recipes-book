import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  optionSel = 'recipe';

  constructor() {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: '',
      authDomain: ''
    });
  }

  onNavigate(option: string) {
    this.optionSel = option;
  }
}

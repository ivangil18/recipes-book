import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromAppStore from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f')
  ingredientData: NgForm;
  editMode = false;
  subscription: Subscription;
  editIngredient: Ingredient;

  constructor(private store: Store<fromAppStore.AppState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(data => {
      if (data.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editIngredient = data.editedIngredient;
        this.ingredientData.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddItem() {
    const ingName = this.ingredientData.value.name;
    const ingAmount = this.ingredientData.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          ingredient: newIngredient
        })
      );
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.ingredientData.reset();
  }

  onClear() {
    this.ingredientData.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}

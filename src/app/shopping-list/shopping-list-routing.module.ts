
// This is not use for now because we are no lazy loading
// the shoppingList component



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoutes: Routes = [
  { path: '', component: ShoppingListComponent }
];
@NgModule({
  imports: [RouterModule.forChild(shoppingListRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}

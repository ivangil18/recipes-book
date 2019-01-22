import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule]
})
export class AuthModule {}

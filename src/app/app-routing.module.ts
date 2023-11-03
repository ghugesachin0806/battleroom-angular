import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-components/login/login.component';
import { SignUpComponent } from './auth-components/signup/signup.component';

const routes: Routes = [{path:'login',component:LoginComponent},{path:'signup',component:SignUpComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

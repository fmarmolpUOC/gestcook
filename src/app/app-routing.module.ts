import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NewrecipeComponent } from './components/newrecipe/newrecipe.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { Page404Component } from './components/page404/page404.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: 'newrecipe', component: NewrecipeComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

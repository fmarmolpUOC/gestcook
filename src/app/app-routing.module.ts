import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NewrecipeComponent } from './components/newrecipe/newrecipe.component';
import { DetailsComponent } from './components/details/details.component';
import { DetailsFavoritesComponent } from './components/details-favorites/details-favorites.component';
import { DetailsRecipesComponent } from './components/details-recipes/details-recipes.component';
import { EditComponent } from './components/edit/edit.component';
import { Page404Component } from './components/page404/page404.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { EditprofileComponent } from './components/user/editprofile/editprofile.component';
import { PassresetComponent } from './components/user/passreset/passreset.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuFavoritesComponent } from './components/menu-favorites/menu-favorites.component';
import { MenuRecipesComponent } from './components/menu-recipes/menu-recipes.component';
import { MenuDateComponent } from './components/menu-date/menu-date.component';
import { ListComponent } from './components/list/list.component';
import { DetailsMyRecipesComponent } from './components/details-my-recipes/details-my-recipes.component';

const routes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: 'newrecipe', component: NewrecipeComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard]},
  {path: 'details_favorites/:id', component: DetailsFavoritesComponent, canActivate: [AuthGuard]},
  {path: 'details_recipes/:id', component: DetailsRecipesComponent, canActivate: [AuthGuard]},
  {path: 'details_my_recipes/:id', component: DetailsMyRecipesComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  {path: 'menu_favorites/:id', component: MenuFavoritesComponent, canActivate: [AuthGuard]},
  {path: 'menu_recipes/:id', component: MenuRecipesComponent, canActivate: [AuthGuard]},
  {path: 'editprofile', component: EditprofileComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'menu_date/:id', component: MenuDateComponent, canActivate: [AuthGuard]},
  {path: 'list', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'passreset', component: PassresetComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

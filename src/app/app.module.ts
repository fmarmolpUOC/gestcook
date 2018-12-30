import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';

// Modules
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password'; // https://www.npmjs.com/package/ngx-show-hide-password
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';



// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NewrecipeComponent } from './components/newrecipe/newrecipe.component';
import { AdminComponent } from './components/admin/admin.component';
import { LandingComponent } from './components/landing/landing.component';
import { Page404Component } from './components/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { EditprofileComponent } from './components/user/editprofile/editprofile.component';
import { PassresetComponent } from './components/user/passreset/passreset.component';
import { MenuComponent } from './components/menu/menu.component';


// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';

export const firebaseConfig = environment.firebaseConfig;


// Envitonments
import { environment } from '../environments/environment';


// Guard
import { AuthGuard } from './guards/auth.guard';
import { DetailsFavoritesComponent } from './components/details-favorites/details-favorites.component';
import { DetailsRecipesComponent } from './components/details-recipes/details-recipes.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NewrecipeComponent,
    AdminComponent,
    LandingComponent,
    Page404Component,
    FooterComponent,
    EditComponent,
    DetailsComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    FavoritesComponent,
    RecipesComponent,
    EditprofileComponent,
    PassresetComponent,
    MenuComponent,
    DetailsFavoritesComponent,
    DetailsRecipesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ShowHidePasswordModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule


  ],
  providers: [
    AuthService, AuthGuard, RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

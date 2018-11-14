import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome'

/*import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import * as firebase from 'firebase';

import { ENV } from '@env';*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFontAwesomeModule
    /*,
    AngularFireModule.initializeApp(ENV.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule*/
  ],
  providers: [
    /*AuthService,
    DatabaseService,
    ServiceWorkerService,
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    { provide: LoggerService, useClass: ConsoleLoggerService }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  /*constructor( @Optional() @SkipSelf() parentModule: CoreModule,
    private afs: AngularFirestore) {

  throwIfAlreadyLoaded(parentModule, 'CoreModule');

  const settings = { timestampsInSnapshots: true };
  afs.app.firestore().settings(settings as firebase.firestore.Settings);
  }*/
}

import { ApplicationConfig , importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { firebaseConfig } from './Firebase/firebase';
import { firebaseProviders } from './firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    firebaseProviders,
    provideHttpClient(
      withFetch()
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ])
  ]
};

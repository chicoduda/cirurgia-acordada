import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { MATERIAL_IMPORTS } from './material';

import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    MATERIAL_IMPORTS,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
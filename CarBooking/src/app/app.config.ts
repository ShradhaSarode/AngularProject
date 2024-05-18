import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// src/main.ts
import 'reflect-metadata';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));


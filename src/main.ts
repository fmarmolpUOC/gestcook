import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/*platformBrowserDynamic().bootstrapModule(AppModule).then(() => {

  const isSafari = () => {
    return navigator.userAgent.indexOf('Safari') !== -1;
  };

  if (isSafari()) {
    console.log('Service Worker not registered');
  } else {

    if ('serviceWorker' in navigator && ENV.production) {
      navigator.serviceWorker.register('/ngsw-worker.js');
      console.log('Service Worker registered');
    }

  }
}).catch(err => console.error(err));*/

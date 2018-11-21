// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Initialize Firebase
  firebaseConfig: {
    apiKey: 'AIzaSyCFdQqcoOAHKil6suTSWw6ODrpOIwTF0Qw',
    authDomain: 'gestcook-1ef19.firebaseapp.com',
    databaseURL: 'https://gestcook-1ef19.firebaseio.com',
    projectId: 'gestcook-1ef19',
    storageBucket: 'gestcook-1ef19.appspot.com',
    messagingSenderId: '1074945473193'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

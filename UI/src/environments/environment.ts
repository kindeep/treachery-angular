// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: "AIzaSyCueIewpKToHjMcRgnmQYx2ThQjeO-tnHg",
  authDomain: "treachery2-871c6.firebaseapp.com",
  databaseURL: "https://treachery2-871c6.firebaseio.com",
  projectId: "treachery2-871c6",
  storageBucket: "treachery2-871c6.appspot.com",
  messagingSenderId: "503179684249",
  appId: "1:503179684249:web:eabd8e21823373899c0b08",
  measurementId: "G-WRVFMCCYEQ"
};

export const environment = {
  production: false,
  firebase: {
    ...firebaseConfig
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

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBp9kqVfPA-9OLZEVxIQpYXIAvd_vwEQh8',
    authDomain: 'example-e3b15.firebaseapp.com',
    databaseURL: 'https://example-e3b15.firebaseio.com',
    projectId: 'example-e3b15',
    storageBucket: 'example-e3b15.appspot.com',
    messagingSenderId: '162064246948',
    appId: '1:162064246948:web:422ebd9020958e7f'
  },
  sweetAlert: {
    buttonsStyling: false,
    customClass: 'modal-content',
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn',
  },
  mapsKey: {
    apiKey: 'AIzaSyAuYXawrzjug2cr4cJpHKqO26Bv9c8n4W8'
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

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apirest: {
    base: 'https://admin.mypod.ar/api/public/api',
    // public

    // user
    colors: '/items/colors',
    links: '/items/links',
    login: '/auth/authenticate',
    requestPassword: '/auth/password/request',
    resetPassword: '/auth/password/reset',
    refreshToken: '/auth/refresh',
    requestCode: '/custom/verification/code/request',
    verifyCode: '/custom/verification/code/verify',
    me: '/users/me',
    invite: '/users/invite',
    users: '/users',
    user: '/items/users',
    files: '/files',
    ttl: 1440 * 15,
  },
};

export const VALIDATORS_REGEX = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const STORAGE_LOCATIONS = {
  USER_SESSION: 'user_session',
  REFRESH_TOKEN: 'session_expired',
  TEMP_EMAIL: 'temp_email',
  TEMP_PASS: 'temp_pass'
};

// https://docs.directus.io/api/errors.html
export const ERROR_CODES = {
  // General
  3: 'La sesión ha expirado. Vuelve a iniciar sesión para continuar.',
  12: 'El correo ya ha sido registrado.',
  // Authentication
  100: 'Ups! Las credenciales son inválidas.',
  101: 'Ups! Las credenciales son inválidas.',
  102: 'Ups! La sesión ha expirado.',
  103: 'La cuenta está pendiente de verificación.',
  104: 'Ups! El enlace es inválido.',
  105: 'Ups! El enlace ha expirado, debes solicitar uno nuevo.',
  106: 'Ups! El usuario no existe.',
  107: 'Ups! El correo ingresado no existe.',
  114: 'Ups! El correo o la contraseña son incorrectos.',
  // Collections
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

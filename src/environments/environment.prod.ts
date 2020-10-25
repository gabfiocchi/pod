export const environment = {
  apirest: {
    base: 'https://pod-admin.gabfiocchi.dev/api',
    // public

    // user
    colors: '/items/colors',
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
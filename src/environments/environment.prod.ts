export const environment = {
  apirest: {
    base: 'https://pod-admin.gabfiocchi.dev/api',
    // public

    // user
    login: '/auth/authenticate',
    requestPassword: '/auth/password/request',
    resetPassword: '/auth/password/reset',
    refreshToken: '/auth/refresh',
    me: '/users/me',
    invite: '/users/invite',
    user: '/users',
  },
};

export const VALIDATORS_REGEX = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
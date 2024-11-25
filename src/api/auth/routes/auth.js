module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/local/register',
      handler: 'custom-register.register',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/custom-email-confirmation',
      handler: 'custom-email-confirmation.emailConfirmation',
      config: {
          policies: [],
          middlewares: [],
      },
    },
  ],
};

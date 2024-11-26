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
      method: 'POST',
      path: '/auth/local/additional-details/:id',
      handler: 'additional-details.updatePersonalData',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};

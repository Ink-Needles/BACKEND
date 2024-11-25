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
  ],
};

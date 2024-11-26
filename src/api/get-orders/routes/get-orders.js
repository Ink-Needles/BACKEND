module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/get-orders/email/:email',
     handler: 'get-orders.getOrdersByEmail',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

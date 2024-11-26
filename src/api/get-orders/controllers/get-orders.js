'use strict';

module.exports = {
  async getOrdersByEmail(ctx) {
    const { email } = ctx.params;

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    try {
      const orders = await strapi.query('api::order.order').findMany({
        where: { email },
      });

      if (!orders.length) {
        return ctx.notFound('No orders found for this email');
      }

      return ctx.send(orders);
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching orders');
    }
  },
};
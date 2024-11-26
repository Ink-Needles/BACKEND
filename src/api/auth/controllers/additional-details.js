'use strict';

const { sanitize } = require('@strapi/utils');
const jwt = require('jsonwebtoken');

module.exports = {
  async updatePersonalData(ctx) {
    const { personalData } = ctx.request.body;

    if (!personalData) {
      return ctx.badRequest('personalData is required');
    }

    const token = ctx.request.header.authorization;
    if (!token) {
      return ctx.unauthorized('Authorization header is missing');
    }

    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), strapi.config.get('plugin.users-permissions.jwtSecret'));
      const userId = (decoded && typeof decoded !== 'string') ? decoded.id : null;
      if (!userId) {
        return ctx.unauthorized('Invalid token');
      }

      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { id: userId } });

      if (!user) {
        return ctx.notFound('User not found');
      }

      const updatedUser = await strapi.query('plugin::users-permissions.user').update({
        where: { id: userId },
        data: { personalData },
      });

      const sanitizedUser = await sanitize.contentAPI.output(updatedUser, strapi.getModel('plugin::users-permissions.user'));

      return ctx.send(sanitizedUser);
    } catch (error) {
      console.error('Error updating personalData:', error);
      return ctx.internalServerError('An error occurred while updating personalData');
    }
  },
};
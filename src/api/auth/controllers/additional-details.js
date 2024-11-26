'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async updatePersonalData(ctx) {
    const { id } = ctx.params;
    const { personalData } = ctx.request.body;

    if (!personalData) {
      return ctx.badRequest('personalData is required');
    }

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { id } });

      if (!user) {
        return ctx.notFound('User not found');
      }

      const updatedUser = await strapi.query('plugin::users-permissions.user').update({
        where: { id },
        data: { personalData },
      });

      const sanitizedUser = await sanitize.contentAPI.output(updatedUser, strapi.getModel('plugin::users-permissions.user'));

      return ctx.send(sanitizedUser);
    } catch (error) {
      return ctx.internalServerError('An error occurred while updating personalData');
    }
  },
};
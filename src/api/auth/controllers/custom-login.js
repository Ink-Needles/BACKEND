'use strict';

const { sanitize } = require('@strapi/utils');
const { ApplicationError } = require('@strapi/utils').errors;

module.exports = {
  async login(ctx) {
    const { identifier, password } = ctx.request.body;

    if (!identifier || !password) {
      return ctx.badRequest('Email and password are required');
    }

    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email: identifier },
    });

    if (!user) {
      return ctx.internalServerError('User not found');
    }

    const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(password, user.password);

    if (!validPassword) {
      return ctx.badRequest('Invalid email or password');
    }

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

    const sanitizedUser = await sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));

    return ctx.send({ jwt, user: sanitizedUser });
  },
};
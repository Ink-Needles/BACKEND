'use strict';

const { sanitize } = require('@strapi/utils');
const { ApplicationError } = require('@strapi/utils').errors;
const bcrypt = require('bcryptjs');

module.exports = {
  async login(ctx) {
    const { identifier, password, sub } = ctx.request.body;

    if ((!identifier || !password) && !sub) {
      return ctx.badRequest('Email and password are required');
    }

    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email: identifier },
    });

    if (!user) {
      return ctx.internalServerError('User not found');
    }

    const validPassword = password ? await bcrypt.compare(password, user.password) : null;

    if (!validPassword) {
      if (sub && user.sub !== sub) {
        return ctx.badRequest('You cannot log in with this account');
      } else {
        return ctx.badRequest('Invalid email or password');
      }
    }

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

    const sanitizedUser = await sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));

    return ctx.send({ jwt, user: sanitizedUser });
  },
};
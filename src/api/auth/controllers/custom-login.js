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
      return ctx.badRequest('Invalid email or password');
    } else {
      // if the user sub is not null, it means that the user is logging in with Google and we need to check if the sub is the same so he can log in
      if (sub && user.sub !== sub) {
        return ctx.badRequest('You cannot log in with this account');
      }
    }

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

    const sanitizedUser = await sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));

    return ctx.send({ jwt, user: sanitizedUser });
  },
};
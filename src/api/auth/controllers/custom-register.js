'use strict';

const { sanitize } = require('@strapi/utils');
const { ApplicationError } = require('@strapi/utils').errors;

module.exports = {
  async register(ctx) {
    const { email, username, password } = ctx.request.body;

    if (!email || !username || !password) {
      return ctx.badRequest('Email, username, and password are required');
    }

    const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email },
    });

    if (existingUser) {
      return ctx.badRequest('Email is already taken');
    }

    const newUser = await strapi.query('plugin::users-permissions.user').create({
      data: {
        email,
        username,
        password,
        confirmed: false, // Ensure the confirmed field is set to false
      },
    });

    const sanitizedUser = await sanitize.contentAPI.output(newUser, strapi.getModel('plugin::users-permissions.user'));

    return ctx.send({ user: sanitizedUser });
  },
};
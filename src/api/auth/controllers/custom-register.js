'use strict';

const { sanitize } = require('@strapi/utils');
const { ApplicationError } = require('@strapi/utils').errors;

module.exports = {
  async register(ctx) {
    const { email, username, password, google } = ctx.request.body;

    if (!email || !username || !password) {
      return ctx.badRequest('Email, username, and password are required');
    }

    const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email },
    });

    if (existingUser) {
      return ctx.badRequest('Email is already taken');
    }

    const authenticatedRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' },
    });

    if(google) {
      const newUser = await strapi.query('plugin::users-permissions.user').create({
        data: {
          email,
          username,
          password,
          confirmed: true,
          confirmationToken: strapi.plugins['users-permissions'].services.jwt.issue({ email }),
          role: authenticatedRole.id,
        },
      });

      const sanitizedUser = await sanitize.contentAPI.output(newUser, strapi.getModel('plugin::users-permissions.user'));

      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: newUser.id });

      return ctx.send({ jwt, user: sanitizedUser });
    }

    const newUser = await strapi.query('plugin::users-permissions.user').create({
      data: {
        email,
        username,
        password,
        confirmed: false,
        confirmationToken: strapi.plugins['users-permissions'].services.jwt.issue({ email }),
        role: authenticatedRole.id,
      },
    });

    const sanitizedUser = await sanitize.contentAPI.output(newUser, strapi.getModel('plugin::users-permissions.user'));

    // Send confirmation email
    await strapi.plugins['email'].services.email.send({
      to: email,
      from: 'vencislav.developer@gmail.com',
      subject: 'Email Confirmation',
      text: `Please confirm your email by clicking on the following link: http://localhost:3000/confirmation?confirmation=${newUser.confirmationToken}`,
      html: `<p>Please confirm your email by clicking on the following link:</p><a href="http://localhost:3000/confirmation?confirmation=${newUser.confirmationToken}">Confirm your email</a>`,
    });

    return ctx.send({ user: sanitizedUser });
  },
};
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
        confirmed: false,
        confirmationToken: strapi.plugins['users-permissions'].services.jwt.issue({ email }),
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
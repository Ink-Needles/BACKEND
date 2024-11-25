'use strict';

module.exports = {
    async createUser(data) {
        const { email, username, password, role } = data;

        const newUser = await strapi.query('plugin::users-permissions.user').create({
            data: {
                email,
                username,
                password,
                confirmed: false,
                role,
            },
        });

        const confirmationToken = strapi.plugins['users-permissions'].services.jwt.issue({ email });

        await strapi.query('plugin::users-permissions.user').update({
            where: { id: newUser.id },
            data: { confirmationToken },
        });

        return newUser;
    },
};
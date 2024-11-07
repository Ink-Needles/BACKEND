module.exports = {
    async emailConfirmation(ctx) {
        const { confirmation } = ctx.query;
    
        if (!confirmation) {
            return ctx.badRequest('Missing confirmation token');
        }
    
        // Find the user by the confirmation token
        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: { confirmationToken: confirmation },
        });
    
        if (!user) {
            return ctx.badRequest('Invalid confirmation token');
        }
    
        // Update the user's confirmed status and remove the confirmation token
        await strapi.query('plugin::users-permissions.user').update({
            where: { id: user.id },
            data: {
                confirmed: true,
                confirmationToken: null,
            },
        });
    
        // Generate JWT token
        const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });
    
        // Return the token and user information
        return ctx.send({ jwt, user });
    },
};
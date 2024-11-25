module.exports = (plugin) => {
    plugin.hooks = {
        async afterCreate(event) {
            const { result } = event;
    
            if (result) {
                const confirmationToken = strapi.plugins['users-permissions'].services.jwt.issue({ email: result.email });
        
                await strapi.query('plugin::users-permissions.user').update({
                        where: { id: result.id },
                        data: { confirmationToken },
                });
            }
        },
    };
  
    return plugin;
};
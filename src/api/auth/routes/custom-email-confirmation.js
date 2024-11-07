module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/auth/custom-email-confirmation',
            handler: 'custom-email-confirmation.emailConfirmation',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
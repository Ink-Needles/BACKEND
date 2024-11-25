module.exports = ({ env }) => {
    return {
        upload: {
            config: {
                provider: "strapi-provider-firebase-storage",
                providerOptions: {
                    // @ts-ignore
                    serviceAccount: JSON.parse(env("FIREBASE_PRIVATE_KEY")),
                    // Custom bucket name
                    bucket: "ink-needles.firebasestorage.app",
                    sortInStorage: true, // true | false
                    debug: false, // true | false
                },
            },
        },
        email: {
            config: {
                provider: 'sendgrid',
                providerOptions: {
                    apiKey: env('SMTP_PASSWORD'),
                },
                settings: {
                    defaultFrom: 'vencislav.developer@gmail.com', // Sender's email address
                    defaultReplyTo: 'vencislav.developer@gmail.com', // Reply-to email address
                },
            },
        },
        'users-permissions': {
            config: {
                emailConfirmation: true,
                emailConfirmationRedirection: 'http://localhost:3000/confirmation',
            },
        },
    };
};
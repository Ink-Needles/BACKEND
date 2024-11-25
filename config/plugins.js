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
            provider: 'smtp',
            providerOptions: {
                host: env('SMTP_HOST', 'smtp.gmail.com'),
                port: 587,
                auth: {
                    user: env('SMTP_USERNAME'), // your email address or SMTP username
                    pass: env('SMTP_PASSWORD'), // your email password or SMTP password
                },
            },
            
            settings: {
                defaultFrom: 'vencislav.developer@gmail.com',
                defaultReplyTo: 'vencislav.developer@gmail.com',
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
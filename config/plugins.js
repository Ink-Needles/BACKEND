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
                secure: false,
                auth: {
                    user: env('SMTP_USERNAME'), // your email address or SMTP username
                    pass: env('SMTP_PASSWORD'), // your email password or SMTP password
                },
            },
            
            settings: {
                defaultFrom: 'vencislav2.manoilov@gmail.com',
                defaultReplyTo: 'vencislav2.manoilov@gmail.com',
            },
        },
        'users-permissions': {
            config: {
                email: {
                    from: 'vencislav2.manoilov@gmail.com',
                    replyTo: 'vencislav2.manoilov@gmail.com',
                },
                emailConfirmation: true,
                emailConfirmationRedirection: 'https://ink-needles.netlify.app/',
            },
        },
    };
};
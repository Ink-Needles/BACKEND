module.exports = {
    routes: require('./routes/custom-email-confirmation'),
    controllers: {
        'custom-email-confirmation': require('./controllers/custom-email-confirmation'),
    },
};
// prod.js - prod keys - DO COMMIT
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    sendGridKey: process.env.SEND_GRID_KEY,
    redirectDomain: process.env.REDIRECT_DOMAIN,
    leagueApiKey: process.env.RIOT_API_KEY,
    baseURL: process.env.RIOT_API_BASE_URL,
    corsURL_1: process.env.CORS_URL_1,
    corsURL_2: process.env.CORS_URL_2,
    corsURL_3: process.env.CORS_URL_3,
    corsURL_4: process.env.CORS_URL_4,
    corsURL_5: process.env.CORS_URL_5,
};

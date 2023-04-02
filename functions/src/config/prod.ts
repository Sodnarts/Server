import { Keys } from './types';
import { defineString } from 'firebase-functions/params';

// prod.ts - prod keys - DO COMMIT
export const prodKeys: Keys = {
    mongoURI: defineString('MONGO_URI').value(),
    sendGridKey: defineString('SEND_GRID_KEY').value(),
    leagueApiKey: defineString('RIOT_API_KEY').value(),
    baseURL: defineString('RIOT_API_BASE_URL').value(),
    continentalBaseUrl: defineString('RIOT_API_CONTINENTAL_URL').value(),
    emailRedirectUrl: defineString('EMAIL_REDIRECT_URL').value(),
    corsURL_1: defineString('CORS_URL_1').value(),
    corsURL_2: defineString('CORS_URL_2').value(),
    corsURL_3: defineString('CORS_URL_3').value(),
    corsURL_4: defineString('CORS_URL_4').value(),
    corsURL_5: defineString('CORS_URL_5').value(),

    corsURL_6: defineString('CORS_URL_6').value(),
    corsURL_7: defineString('CORS_URL_7').value(),
    corsURL_8: defineString('CORS_URL_8').value(),
    corsURL_9: defineString('CORS_URL_9').value(),
    corsURL_10: defineString('CORS_URL_10').value(),
    corsURL_11: defineString('CORS_URL_11').value(),
    corsURL_12: defineString('CORS_URL_12').value(),
    corsURL_13: defineString('CORS_URL_13').value(),
};

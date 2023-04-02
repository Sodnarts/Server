import * as functions from 'firebase-functions';
import * as express from 'express';
import mongoose from 'mongoose';
import { keys } from './config/keys';
import * as bodyParser from 'body-parser';

import './models';
import './models/Recipes';
import './models/Image';
import './models/localization/Project';

import { emailRoutes, leagueRoutes, localizationRoutes, recipesRoutes } from './routes';

mongoose.connect(keys.mongoURI);

const app = express();

app.use(function (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        const corsWhitelist = [
            keys.corsURL_1,
            keys.corsURL_2,
            keys.corsURL_3,
            keys.corsURL_4,
            keys.corsURL_5,
            keys.corsURL_6,
            keys.corsURL_7,
            keys.corsURL_8,
            keys.corsURL_9,
            keys.corsURL_10,
            keys.corsURL_11,
            keys.corsURL_12,
            keys.corsURL_13,
        ];

        console.log('Request from: ', req.headers.origin);
        if (corsWhitelist.indexOf(req.headers.origin || '') !== -1) {
            console.log(corsWhitelist.indexOf(req.headers.origin || ''));
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        }
    } else {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5001/');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

leagueRoutes(app);
recipesRoutes(app);
localizationRoutes(app);
emailRoutes(app);

exports.api = functions.https.onRequest(app);
exports.api = functions.region('europe-west1').https.onRequest(app);

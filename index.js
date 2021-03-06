const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/user');
require('./models/Survey');
require('./services/passport');
const options = {
    useNewUrlParser: true,
};
mongoose.connect(keys.mongoURI, options, (err) => {
    console.log('error occured', err);
});

const app = express();

app.use(function (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        const corsWhitelist = [keys.corsURL_1, keys.corsURL_2, keys.corsURL_3, keys.corsURL_4, keys.corsURL_5];
        console.log('Request from: ', req.headers.origin);

        if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
        }
    } else {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    next();
});

app.use(bodyParser.json());
app.use(session({ secret: keys.cookieKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./routes/settingsRoutes')(app);
require('./routes/accountRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/webShopRoutes')(app);
require('./routes/leagueRoutes')(app);
require('./routes/userAdminRoutes')(app);
require('./routes/dbStructureRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

exports.app;

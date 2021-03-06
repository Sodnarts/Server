const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    googleName: String,
    credits: { type: Number, default: 0 },
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'en' },
    address: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneNo: { type: String, default: '' },
    city: { type: String, default: '' },
    roles: { type: [String], default: ['League-Watcher'] },
    favoriteSN: { type: [String], default: ['Faker'] },
});

mongoose.model('user', userSchema);

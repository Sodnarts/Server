import mongoose from 'mongoose';

const { Schema } = mongoose;

export const imageSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String,
    },
});

mongoose.model('image', imageSchema);

import mongoose from 'mongoose';

const { Schema } = mongoose;

const translationSchema = new Schema({
    strings: [String],
});

mongoose.model('translations', translationSchema);
export { translationSchema };

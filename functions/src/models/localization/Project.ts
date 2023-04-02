import mongoose from 'mongoose';
import { translationSchema } from './Translations';

const { Schema } = mongoose;

const projectSchema = new Schema({
    title: String,
    description: String,
    lastEditDate: Number,
    languages: [String],
    translations: [translationSchema],
});

mongoose.model('project', projectSchema);

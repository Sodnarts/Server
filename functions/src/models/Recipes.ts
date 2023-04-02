import mongoose from 'mongoose';
import { imageSchema as ImageSchema } from './Image';

const { Schema } = mongoose;

const recipeSchema = new Schema({
    ingredients: [{ ingredient: String, volume: String }],
    instructions: { titles: [{ key: String, value: String }], descriptions: [{ key: String, value: String }] },
    subCategories: [{ value: String, label: String }],
    name: { type: String, default: 'A Dish' },
    prepTimeMax: { type: String, default: 0 },
    prepTimeMin: { type: String, default: 0 },
    portions: { type: String, default: 0 },
    type: { type: String, default: 'Dinner' },
    timeCreated: Number,
    image: { type: ImageSchema, default: null },
});

mongoose.model('recipes', recipeSchema);

import mongoose from 'mongoose';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const Recipe = mongoose.model('recipes');
const Image = mongoose.model('image');

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, __dirname + '/uploads');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({ storage: storage });

export const recipesRoutes = (app: any) => {
    app.get('/recipes', async (req: any, res: any) => {
        console.log('Start fetching recipes');
        const recipes = await Recipe.find({});
        console.log('Finished fetching recipes');

        res.send(recipes);
    });

    app.post('/recipes/current', async (req: any, res: any) => {
        const recipe = await Recipe.find({ _id: req.body._id });

        res.send(recipe[0]);
    });

    app.post('/recipes/new', upload.single('image'), async (req: any, res: any) => {
        const json = JSON.parse(req.body.recipe);
        const {
            ingredients,
            instructions,
            subCategories,
            name,
            prepTimeMax,
            prepTimeMin,
            portions,
            type,
            timeCreated,
        } = json;

        let image = null;
        if (req.file) {
            image = new Image({
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png',
                },
            });
        }

        const recipe = new Recipe({
            ingredients,
            instructions,
            subCategories,
            name,
            prepTimeMax,
            prepTimeMin,
            portions,
            type,
            timeCreated,
            image: image,
        });
        await recipe.save();
        const recipes = await Recipe.find({});
        res.send(recipes);
    });

    app.post('/recipes/edit', upload.single('image'), async (req: any, res: any) => {
        const json = JSON.parse(req.body.recipe);
        const {
            ingredients,
            instructions,
            subCategories,
            name,
            prepTimeMax,
            prepTimeMin,
            portions,
            type,
            timeCreated,
            _id,
        } = json;

        const recipe = await Recipe.find({ _id });

        let image = null;
        if (req.file) {
            image = new Image({
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png',
                },
            });
        }

        recipe[0].ingredients = ingredients;
        recipe[0].instructions = instructions;
        recipe[0].subCategories = subCategories;
        recipe[0].name = name;
        recipe[0].prepTimeMax = prepTimeMax;
        recipe[0].prepTimeMin = prepTimeMin;
        recipe[0].portions = portions;
        recipe[0].type = type;
        recipe[0].timeCreated = timeCreated;
        recipe[0].image = image;

        await recipe[0].save();
        const recipes = await Recipe.find({});
        res.send(recipes);
    });

    app.post('/recipes/delete', async (req: any, res: any) => {
        await Recipe.deleteOne({ _id: req.body._id });

        const recipes = await Recipe.find({});
        res.send(recipes);
    });
};

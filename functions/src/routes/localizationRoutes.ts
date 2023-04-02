import mongoose from 'mongoose';

const Project = mongoose.model('project');
const Translation = mongoose.model('translations');

export const localizationRoutes = (app: any) => {
    app.get('/user', async (req: any, res: any) => {
        const user = {
            name: 'Ola',
            email: 'mail@mail.no',
        };
        console.log(req.body);

        if (req.get('Authorization') != 'Bearer null') {
            res.send(user);
        } else {
            res.status(401).send('Not logged in.');
        }
    });

    app.post('/user', async (req: any, res: any) => {
        const user = {
            name: 'Ola',
            email: 'mail@mail.no',
        };
        if (req.get('Authorization') != 'Bearer null') {
            res.send(user);
        } else {
            res.status(401).send('Not logged in.');
        }
    });

    app.post('/logout', async (req: any, res: any) => {
        res.send('OK');
    });

    app.get('/projects', async (req: any, res: any) => {
        const projects = await Project.find({}).select({
            description: false,
            languages: false,
            translations: false,
            lastEditDate: false,
        });
        console.log('GET /projects: -- ', projects);
        res.send(projects);
    });

    app.post('/projects/current', async (req: any, res: any) => {
        const project = await Project.find({ _id: req.body._id });
        console.log('POST /projects/current: -- ', project);
        res.send(project[0]);
    });

    app.post('/projects/new', async (req: any, res: any) => {
        const { title, description, languages, translations } = req.body;

        const newTranslations: any[] = [];
        translations.map((t: any) => {
            newTranslations.push(new Translation({ strings: t.strings }));
        });

        const project = new Project({
            title,
            description,
            languages,
            translations: newTranslations,
            lastEditDate: Date.now(),
        });

        await project.save();
        res.send(project);
    });

    app.post('/projects/edit', async (req: any, res: any) => {
        const { title, description, languages, _id } = req.body;

        const project = await Project.find({ _id });

        title ? (project[0].title = title) : undefined;
        description ? (project[0].description = description) : undefined;
        languages ? (project[0].languages = languages) : undefined;
        project[0].lastEditDate = Date.now();

        await project[0].save();
        res.send(project[0]);
    });

    app.post('/translations/new', async (req: any, res: any) => {
        const { translation, _id } = req.body;

        const newTranslation = new Translation({ strings: translation.strings });

        const project = await Project.find({ _id });

        project[0].translations = [...project[0].translations, newTranslation];

        console.log('POST /translations/new: -- ', project);

        await project[0].save();
        res.send(project[0]);
    });

    app.post('/translations/edit', async (req: any, res: any) => {
        const { translation, _id } = req.body;

        const project = await Project.find({ _id });
        const tmpTranslation = project[0].translations.filter((t: any) => {
            return t._id == translation._id;
        });

        tmpTranslation[0].strings = translation.strings;

        console.log('POST /translations/edit: -- ', project);

        await project[0].save();
        res.send(project[0]);
    });

    app.post('/translations/delete', async (req: any, res: any) => {
        const { _id, translationId } = req.body;

        const project = await Project.find({ _id });

        const tmpTranslations = project[0].translations.filter((t: any) => {
            return t._id != translationId;
        });

        project[0].translations = tmpTranslations;

        console.log('POST /translations/delete: -- ', project);

        await project[0].save();
        res.send(project[0]);
    });

    app.post('/projects/delete', async (req: any, res: any) => {
        await Project.deleteOne({ _id: req.body._id });

        const projects = await Project.find({});
        res.send(projects);
    });
};

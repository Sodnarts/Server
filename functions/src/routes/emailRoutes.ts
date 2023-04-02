import * as sgMail from '@sendgrid/mail';
import { keys } from '../config/keys';

sgMail.setApiKey(keys.sendGridKey);

export const emailRoutes = (app: any) => {
    app.post('/email', async (req: any, res: any) => {
        console.log(req.body);
        const msg = {
            to: 'strandos.glenn@gmail.com',
            from: 'strandos.glenn@gmail.com',
            subject: req.body.subject,
            text: req.body.message,
            // eslint-disable-next-line max-len
            html: `<strong>From: ${req.body.email}</strong><br><br><p>${req.body.message}</p><br><p>Best regards,<br>${req.body.name}</p>`,
        };
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });

        res.redirect(keys.emailRedirectUrl);
    });
};

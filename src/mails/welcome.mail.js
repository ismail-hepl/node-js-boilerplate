import mailConfig from "../../config/mail.config.js";
import mailService from "../services/mail.service.js";
import { fileURLToPath } from 'url';
import path from 'path';
import logger from "../../config/logger.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, '../assets/templates/mail_templates/welcome_mail.ejs');

const sendWelcomeMail = async (user) => {
    try {
        const mailOptions = {
            from: mailConfig.from,
            to: user.email,
            subject: 'Welcome to our app',
            html: templatePath,
            data: { user }
        };
    
        mailService.sendMail(mailOptions);
    } catch (error) {
        logger.error(error);
    }
}

export default sendWelcomeMail;
import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import mailConfig from "../../config/mail.config.js";
import logger from "../../config/logger.config.js";
import asyncHandler from "../Utils/asyncHandler.js";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport(mailConfig);
    }

    sendMail = async (mailOptions) => {
        try {
            if(mailOptions.html) {
                const renderedHtml = await this.renderTemplate(mailOptions.html, mailOptions.data);
                mailOptions.html = renderedHtml;
            }
    
            const info = await this.transporter.sendMail(mailOptions);
            logger.info('Email sent', info);
        } catch (error) {
            logger.error(error);
        }
    };

    renderTemplate = asyncHandler(async (templatePath, data) => {
        try {
            const template = await fs.promises.readFile(templatePath, 'utf-8');
            return ejs.render(template, data);
        } catch (error) {
            logger.error(error);
        }
    });
}

export default new MailService();
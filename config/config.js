import * as dotenv from "dotenv";

dotenv.config();

const DB_URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const config = {
    db: {
        url: DB_URI
    },
    app: {
        name: process.env.APP_NAME,
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
        env: process.env.APP_ENV
    },
    auth: {
        secret: process.env.JWT_SECRET,
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM_ADDRESS
    }
};

export default config;

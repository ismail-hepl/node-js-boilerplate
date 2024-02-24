import winston from "winston";
import * as winstonDaily from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import config from "./config.js";

// Define the path to the logs directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "..", "logs");

// create the logs dir if it doesn't exist
fs.mkdirSync(logsDir, { recursive: true });

const transport = new winston.transports.DailyRotateFile({
    dirname: logsDir,
    filename: 'webspace-%DATE%.log',
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            let logOutput = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

            if (stack) {
                logOutput += `\n${stack}`;
            }
            
            return logOutput;
        })
    ),
    transports: [transport]
});

// If environment is 'Dev', include Console Transport
if (config.app.env === 'Dev') {
    const consoleTransport = new winston.transports.Console();
    logger.add(consoleTransport);
}

export default logger;


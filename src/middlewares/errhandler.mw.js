import logger from "../../config/logger.config.js";
import CustomError from "../utils/customError.js";

const errorHandler = async (err, req, res, next) => {
    logger.error(err);

    const message = err instanceof CustomError ? err.message : "Internal Server Error";
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ status: false, message });
};

export default errorHandler;

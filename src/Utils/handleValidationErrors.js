import { validationResult } from 'express-validator';
import logger from '../../config/logger.config.js';

const handleValidationErrors = (req, res, next) => {
    const errs = validationResult(req);
    
    if (errs.isEmpty()) {
        return next();
    }

    const formattedErrs = errs.array().reduce((acc, err) => {
        acc[err.path] = acc[err.path] || [];
        acc[err.path].push(err.msg);

        return acc;
    }, {});

    logger.error(JSON.stringify(formattedErrs));
    return res.status(400).json({ errors: formattedErrs });
};

export default handleValidationErrors;
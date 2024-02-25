import { body } from 'express-validator';
import handleValidationErrors from "../Utils/handleValidationErrors.js";
import User from '../models/user.model.js';
import hashPassword from '../Utils/hashPassword.js';

// Common validation rules for name, username, and email
const commonValidationRules = [
    body('name')
        .trim()
        .escape()
        .notEmpty().withMessage('Please provide a name')
        .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),

    body('username')
        .trim()
        .escape()
        .notEmpty().withMessage('Please provide a username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .custom(async (value, { req }) => {
            if (req.params.id) {
                const currentUser = await User.findById(req.params.id);
                if (currentUser && currentUser.username === value) {
                    return;
                }
            }
        
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
                throw new Error('Username already exists');
            }
        }),

    body('email')
        .trim()
        .notEmpty().withMessage('Email must be provided')
        .isEmail().withMessage('Please provide a valid email')
        .custom(async (value, { req }) => {
            if (req.params.id) {
                const currentUser = await User.findById(req.params.id);
                if (currentUser && currentUser.email === value) {
                    return;
                }
            }

            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error('Email already exists');
            }
        })
];

const passwordValidationRule = body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .customSanitizer(async (password) => {
        if(password && password !== "") {
            return await hashPassword(password);
        }
    });

const createUserValidationRules = [...commonValidationRules, passwordValidationRule];

const updateUserValidationRules = commonValidationRules;

const getValidationRules = (req) => {
    return req.method === 'POST' ? createUserValidationRules : updateUserValidationRules;
};

const validateUser = async (req, res, next) => {
    const validationRules = getValidationRules(req);
    await Promise.all(validationRules.map(rule => rule.run(req)));
    handleValidationErrors(req, res, next);
};

export default validateUser;

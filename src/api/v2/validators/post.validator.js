// src/api/v2/validators/post.validator.js
import { body } from 'express-validator';

const forbiddenWords = ['spam', 'advertisement'];

// Validation rules for creating a post (V2)
export const createPostRules = [
      body('title')
        .trim()
        .notEmpty().withMessage('Title is required.')
        .isString().withMessage('Title must be a string.')
        .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters long.')
        .custom((value) => {
            const lower = value.toLowerCase();
            for (const word of forbiddenWords) {
                if (lower.includes(word)) {
                    throw new Error(`Title cannot contain the word "${word}".`);
                }
            }
            return true;
        }),
        
    body('body')
        .trim()
        .notEmpty().withMessage('Body is required.')
        .isString().withMessage('Body must be a string.'),

    body('author') // <-- new optional field
        .optional()
        .trim()
        .isString().withMessage('Author must be a string.')
];

// Validation rules for updating a post (PUT) - V2
export const updatePostRules = [
    body('title')
        .optional()
        .trim()
        .notEmpty().withMessage('Title cannot be empty.')
        .isString().withMessage('Title must be a string.')
        .isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters long.'),
    body('body')
        .optional()
        .trim()
        .notEmpty().withMessage('Body cannot be empty.')
        .isString().withMessage('Body must be a string.'),
    body('author') // optional on update
        .optional()
        .trim()
        .isString().withMessage('Author must be a string.')
];

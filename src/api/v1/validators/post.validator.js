//src/api/v1/validators/post.validator.js

import { body } from 'express-validator';

const forbiddenWords = ['spam', 'advertisement'];

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
            return true; // must return true if validation passes
        }),
        
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required.')
        .isString().withMessage('Content must be a string.')
];
// Validation rules for updating a post (PUT)
export const updatePostRules = [
    body('title')
        .optional()
        .trim()
        .notEmpty().withMessage('Title cannot be empty.')
        .isString().withMessage('Title must be a string.')
        .isLength({ min: 5, max: 100 })
        .withMessage('Title must be between 5 and 100 characters long.'),

    body('content')
        .optional()
        .trim()
        .notEmpty().withMessage('Content cannot be empty.')
        .isString().withMessage('Content must be a string.')
];

// src/middleware/errorHandler.js
import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    // Log the full error for the developer
    console.error(err);

    // If the error is a custom ApiError we created, use its details
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // For all other unexpected errors, send a generic 500 response
    return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
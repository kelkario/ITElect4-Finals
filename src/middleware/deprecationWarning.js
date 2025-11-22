// src/middleware/deprecationWarning.js
const deprecationWarning = (req, res, next) => {
    res.setHeader('X-API-Warn', 'This API version is deprecated');
    next();
};

export default deprecationWarning;

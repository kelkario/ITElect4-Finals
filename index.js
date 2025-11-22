// index.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import config from './src/config/index.js';
import postRoutes from './src/api/v1/routes/post.routes.js';
import userRoutes from './src/api/v1/routes/user.routes.js';
import v1PostRoutes from './src/api/v1/routes/post.routes.js';
import v2PostRoutes from './src/api/v2/routes/post.routes.js';
import commentRoutes from './src/api/v1/routes/comment.routes.js';
import authRoutes from './src/api/v1/routes/auth.routes.js';
import deprecationWarning from './src/middleware/deprecationWarning.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';
import { testConnection } from './src/config/db.js';

const app = express();

// Logging
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// JSON parser
app.use(express.json());

// Test DB on startup
testConnection();

// Routes
app.use('/posts', postRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/v1/posts', deprecationWarning, v1PostRoutes); 
app.use('/api/v2/posts', v2PostRoutes);
app.use('/api/comments', commentRoutes); 

// Mount the routes with an /api prefix
app.use('/api/auth', authRoutes); // MOUNT
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);


// Centralized error handler - MUST be last middleware
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});

























//key from user login
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTc2MzgwODY2NCwiZXhwIjoxNzYzODEyMjY0fQ.-wI_0GnmxobtdvPUAxS3BZKXNOVS2x6iFe_jXy-xAks"

//userA JWT id:3
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJVc2VyQSIsImVtYWlsIjoidXNlckFAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjM4MTIxMTcsImV4cCI6MTc2MzgxNTcxN30.YM0LbDN5HzNzTtC_2hd4o97tUJpowvmDen2_xOgpsUk

//userB JWT id:4
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJVc2VyQiIsImVtYWlsIjoidXNlckJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NjM4MTIyNDYsImV4cCI6MTc2MzgxNTg0Nn0.LlVkGbauIEkwSF-ygBjNcRdG2k5cpbxnK-8NszrFFc8
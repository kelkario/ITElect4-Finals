import { Router } from 'express';
import * as postController from '../controllers/post.controller.js'; 
import * as commentController from '../controllers/comment.controller.js';
import { validatePost, validateComment } from '../../../middleware/validator.middleware.js';
import { authMiddleware } from '../../../middleware/auth.middleware.js';


const router = Router();

// POST route with validation
router.post('/', authMiddleware, validatePost, postController.createPost);

// PUT route with validation
router.put('/:id', authMiddleware, validatePost, postController.updatePost);

// GET all posts
router.get('/', postController.getAllPosts);

// GET a single post by ID
router.get('/:id', postController.getPostById);

// PATCH route for partial update
router.patch('/:id', postController.partiallyUpdatePost);

// DELETE a post
router.delete('/:id', authMiddleware, postController.deletePost);

// Create a comment for a specific post
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);

// Get all comments for a specific post
router.get('/:postId/comments', commentController.getCommentsByPostId);

export default router;

// src/api/v2/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js'; // <-- must be here
import { createPostRules, updatePostRules } from '../validators/post.validator.js';

const router = Router();

// POST route with validation
router.post('/', createPostRules, postController.createPost);

// PUT route with validation
router.put('/:id', updatePostRules, postController.updatePost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
// PATCH will have its own validators later
router.delete('/:id', postController.deletePost);

export default router;

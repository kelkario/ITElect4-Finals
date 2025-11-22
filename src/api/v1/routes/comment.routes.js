import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { validateComment } from '../../../middleware/validator.middleware.js';

const router = Router();

router.post('/:postId', validateComment, commentController.createCommentForPost);
router.get('/:id', commentController.getCommentById);
router.get('/post/:postId', commentController.getCommentsByPostId); // fetch comments by post
router.put('/:id', validateComment, commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;

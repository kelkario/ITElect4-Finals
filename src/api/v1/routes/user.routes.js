import { Router } from 'express';
import * as userController from '../controllers/user.controller.js'; // Correct path

const router = Router();

// router.post('/', userController.createUser); // REMOVE THIS LINE
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

export default router;

// src/routes/auth.routes.js
import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js'; //auth controller
import { validateRegistration , validateLogin} from '../../../middleware/validator.middleware.js'; //validator middleware

const router = Router();

// Define the registration endpoint
router.post('/register', validateRegistration, authController.registerUser);
router.post('/login', authController.loginUser); 

export default router;
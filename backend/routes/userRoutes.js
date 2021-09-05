import express from 'express';
const router = express.Router({mergeParams: true});
import { loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
   .post(registerUser);

router.post('/login', loginUser);

export default router;
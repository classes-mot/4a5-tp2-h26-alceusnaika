import express from 'express';
import usersController from '../controllers/users-controllers.js';
const router = express.Router();

router.get('/', usersController.getUsers);

router.get('/profile/:uid', usersController.getUserById);

router.post('/register', usersController.registerUser);

router.post('/login', usersController.login);

router.patch('/profile:/uid', usersController.updatedUserById);

export default router;
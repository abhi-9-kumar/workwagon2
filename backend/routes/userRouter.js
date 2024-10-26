import express from 'express';
import {register} from "../controllers/userController.js";
import {login} from "../controllers/userController.js";
import { logout } from '../controllers/userController.js';
import{isAuthorized} from "../middlewares/auth.js"
import { getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register); // Endpoint for user registration
router.post('/login', login);
router.get('/logout',isAuthorized, logout);
router.get('/getuser',isAuthorized,getUser); // Endpoint for user
router.patch('/update',isAuthorized,updateUser);


export default router;
import express from "express";
import * as UserController from '../controllers/users'
import { requiresAuth } from "../middleware/auth";

const router = express.Router()

router.get('/', requiresAuth, UserController.getSessionUser)
router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/signout', UserController.signOut)

export default router;
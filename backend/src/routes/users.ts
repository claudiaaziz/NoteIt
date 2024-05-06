import express from "express";
import * as UserController from '../controllers/users'
const router = express.Router()

router.get('/', UserController.getAuthenticatedUser)
router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/signout', UserController.signOut)

export default router;
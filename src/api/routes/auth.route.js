import express from 'express'
import * as AuthController from '../controllers/auth.controller'

const router = express.Router()

router.get('/auth/verify-account', AuthController.verifyAccount)
router.post('/auth/login', AuthController.signInAccount)
router.get('/auth/signout',  AuthController.signout)
router.get('/auth/forgot-password', AuthController.forgotPassword)
export default router

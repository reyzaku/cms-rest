import express from 'express'
import passport from 'passport'
import loginStrategy from 'passport-local'
import { localStrategy, loginUser, logoutUser, me, registerUser } from './authController.js'
const router = express.Router()
loginStrategy.Strategy

passport.use(new loginStrategy({ usernameField: 'email' }, localStrategy))
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.get('/me', me)
router.delete('/auth/logout', logoutUser)


export default router
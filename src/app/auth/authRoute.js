import express from 'express'
import passport from 'passport'
import loginStrategy from 'passport-local'
import { localStrategy, loginUser, logoutUser, me, registerUser } from './authController.js'
const router = express.Router()
loginStrategy.Strategy

passport.use(new loginStrategy({ usernameField: 'email' }, localStrategy))
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', me)
router.delete('/logout', logoutUser)


export default router
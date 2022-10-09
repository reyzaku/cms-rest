import User from "../user/model.js";
import Profile from '../profile/model.js'
import passport from "passport";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from "../config.js";

// Register User
export const registerUser = async (req, res, next) => {
	try {
		const payload = req.body
		await User.create(payload)
			.then(async (user) => {
				res.status(200).json({ message: 'Register User Success', data: user })
				if (res.status(200)) {
					await Profile.create({ user: user._id })
				}
			})
	} catch (err) {
		next(err)
	}
}

// Local strategy-local paspport.js
export const localStrategy = async (email, password, done) => {
	try {
		let user = await User.findOne({ email }).select('-__v -createdAt -role -updatedAt -token')
		if (!user) return done()
		if (bcrypt.compareSync(password, user.password)) {
			const { password, ...userNoPassword } = user.toJSON()
			return done(null, userNoPassword)
		}
	} catch (err) {
		done(err, null)
	}

	done();
}

// Login User
export const loginUser = async (req, res, next) => {
	passport.authenticate('local', async function (err, user) {
		if (err) return next(err)
		if (!user) return res.status(400).json({ error: 1, message: 'email or password incorect' })
		let signed = jwt.sign(user, config.secretKey, {
			expiresIn: '3h'
		})
		//Push token and set token to session
		await User.findByIdAndUpdate(user._id, { $push: { token: signed } })
		req.session.token = signed
		res.json({
			message: 'Login Successfully',
			user,
		})
	})(req, res, next)
}

// Logout User
export const logoutUser = async (req, res, next) => {
	try {
		const token = req.session.token
		let user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false })
		if (!user) return res.status(400).json({ message: 'User not found' })
		req.session.destroy((err) => {
			if (err) return next(err)
			return res.status(200).json({ message: 'Success Logout' })
		})
	} catch (err) {
		if (err && err.name === 'ValidationError') {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors
			})
		}
		next(err)
	}
}

// Check user login
export const me = async (req, res,) => {
	if (!req.user) {
		return res.status(401).json({
			error: 2,
			message: "Please login your account"
		})
	}
	res.status(200).json(req.user)
}







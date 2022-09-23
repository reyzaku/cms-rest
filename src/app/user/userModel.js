import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt'

const User = new Schema({
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: [true, 'username already exist'],
	},
	firstname: {
		type: String,
		required: [true, 'firstname is required'],
	},
	lastname: { type: String },
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: [true, 'Email already exist']
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [8, 'Minimun 8 digits '],
		maxlength: [16, 'Maximum 16 digits '],
	},
	role: {
		type: String,
		default: 'user'
	},
	token: [String]
}, { timestamps: true });

User.path('email').validate(function (value) {
	const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return EMAIL_RE.test(value); // Assuming email has a text attribute
}, 'Wrong Email Format.')

const HASH_ROUND = 10;
User.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, HASH_ROUND)
	next()
})

export default model('User', User)
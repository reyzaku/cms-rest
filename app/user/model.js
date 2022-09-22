const mongoose = require('mongoose')
const { model, Schema } = mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose)
const bcrypt = require('bcrypt')

let User = new Schema({
	fullname: {
		type: String,
		required: [true, 'Nama Harus Diisi'],
		maxlength: [255, 'Panjang Nama Tidak Dapat Lebih Dari 255'],
		minlength: [3, 'Minimal Angka 3 ']
	},
	customer_id: { type: Number },
	email: {
		type: String,
		required: [true, 'Email Harus Diisi'],
		maxlength: [255, 'Panjang Email 255 Karakter']
	},
	password: {
		type: String,
		required: [true, 'Password Harus Diisi'],
		maxlength: [255, 'Panjang Email 255 Karakter']
	},
	role: {
		type: String,
		email: ['user', 'admin'],
		default: 'user'
	},
	token: [String]
}, { timestamps: true });

User.path('email').validate(function (value) {
	const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return EMAIL_RE.test(value); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')

User.path('email').validate(async function (value) {
	try {
		const count = await this.model('User').count({ email: value })
		return !count
	} catch (err) {
		throw err
	}
}, attr => `${attr.value} sudah terdaftar`)

const HASH_ROUND = 10;
User.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, HASH_ROUND)
	next()
})

User.plugin(AutoIncrement, { inc_field: 'customer_id' })

module.exports = model('User', User)
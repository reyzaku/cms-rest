import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Profile = new Schema({
	profile_image: { type: String, default: null },
	website_url: { type: String, default: null },
	bio: { type: String, default: null },
	education: { type: String, default: null },
	work: { type: String, default: null },
	skills: { type: [String] },
	current_learn: { type: [String] },
	user: {
		type: Schema.Types.ObjectId,
		reqruied: [true, 'User is Required'],
		ref: 'User'
	}
}, { timestamps: true })

export default model('Profile', Profile)
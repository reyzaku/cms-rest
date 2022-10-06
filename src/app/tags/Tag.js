import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Tag = new Schema({
	name: {
		type: String,
		required: [true, 'Tag is required'],
		maxLength: [30, "Max length 30"],
		minLength: [3, "Min length 3"],
		unique: [true, "Tag already exist"],
	},
	article: {
		type: [Schema.Types.ObjectId],
		required: [true, 'Article Id is required'],
		ref: 'Article'
	},
}, { timestamps: true })

export default model('Tag', Tag)
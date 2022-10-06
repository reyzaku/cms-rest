import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Article = new Schema({
	tags: {
		type: [String],
		required: [true, 'Tag is required'],
		ref: 'Tag'
	},
	user: {
		type: Schema.Types.ObjectId,
		required: [true, 'User is required'],
		ref: 'User'
	},
	title: {
		type: String,
		required: [true, 'Title is required'],
		index: true
	},
	cover_image: {
		type: String
	},
	element: [
		{
			_id: {
				type: String,
			},
			type: {
				type: String,
				required: [true, "Type is required"],
			},
			content: {
				type: String,
				required: [true, "Content is required"]
			}
		}]
}, { timestamps: true })

export default model('Article', Article)
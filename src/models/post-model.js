import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

export const postSchema = Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: User,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	parentPost: {
		type: Post,
		required: false	
	}
});

export default mongoose.model('Post', postSchema);

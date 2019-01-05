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
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	},
	date: {
		type: Date,
		required: true
	},
	parentPost: {
		type: { type: mongoose.Schema.Types.Post, ref: 'Post' },
		required: false
	},
	comments: {
		type: [{ type: mongoose.Schema.Types.Post, ref: 'Post' }],
		required: false
	}
});

export default mongoose.model('Post', postSchema);

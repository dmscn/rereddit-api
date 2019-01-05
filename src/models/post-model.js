import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

export const postSchema = Schema({
	title: {
		type: String,
		required: false
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	date: {
		type: Date,
		required: true
	},
	parentPost: {
		type: { type: Schema.Types.ObjectId, ref: 'Post' },
		required: false
	},
	replies: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
		required: false
	}
});

export default mongoose.model('Post', postSchema);

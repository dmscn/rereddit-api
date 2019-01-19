import mongoose, { Schema } from 'mongoose';

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
		type: { type: Schema.Types.ObjectId, ref: 'User' },
		required: false
	},
	date: {
		type: Date,
		default: Date.now
	},
	parent: {
		type: { type: Schema.Types.ObjectId, ref: 'Post' },
		required: false
	},
	replies: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
		required: false
	}
});

export default mongoose.model('Post', postSchema);

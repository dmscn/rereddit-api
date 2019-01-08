import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

export const replySchema = Schema({
	content: {
		type: String,
		required: true
	},
	author: {
		type: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	date: {
		type: Date,
		default: Date.now
	},
	parentPost: {
		type: { type: Schema.Types.ObjectId, ref: 'Post' },
		required: false
	},
	replies: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
		required: false,
		default: []
	}
});

export default mongoose.model('Reply', replySchema);

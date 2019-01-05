import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

export const userSchema = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	points: {
		type: Number,
		required: false
	},
	avatar: {
		type: String,
		required: true
	}
});

export default mongoose.model('User', userSchema);

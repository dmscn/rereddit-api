// @flow
import mongoose from 'mongoose';

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

export const contactSchema = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
});

export default mongoose.model('Contact', contactSchema);

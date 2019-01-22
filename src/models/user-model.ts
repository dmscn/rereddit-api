import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

export type User = {
  id: String;
  name: String;
  email: String;
  points: Number;
  avatar: String;
};

export const UserSchema = Schema({
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
    required: false,
    default: 0
  },
  avatar: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', UserSchema);

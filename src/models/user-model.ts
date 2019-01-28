import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  points?: number;
  avatar?: string;
  birth?: Date;
  createdAt?: Date;
};

export const UserSchema = Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birth: {
    type: Date
  },
  points: {
    type: Number,
    required: false,
    default: 0
  },
  avatar: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

export default mongoose.model('User', UserSchema);

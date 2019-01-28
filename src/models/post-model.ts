import mongoose, { Schema } from 'mongoose';
import { User } from './user-model';

mongoose.Promise = global.Promise;

export type Post = {
  _id: string;
  title?: string;
  content: string;
  author: User;
  date?: Date;
  parent?: Post;
  replies?: [Post];
};

export const PostSchema = new Schema({
  title: {
    type: String
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
    default: Date.now
  },
  parent: {
    type: String
  },
  replies: {
    // @ts-ignore
    type: [this],
    required: false
  }
});

export default mongoose.model('Post', PostSchema);

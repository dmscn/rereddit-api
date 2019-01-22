import mongoose, { Schema } from 'mongoose';
// eslint-disable-next-line no-unused-vars
import { User } from './user-model';

mongoose.Promise = global.Promise;

export type Post = {
  _id: String;
  title?: String;
  content: String;
  author: User;
  date: Date;
  parent?: Post;
  replies?: [Post];
};

export const PostSchema = new Schema({
  title: {
    type: String,
    required: true
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

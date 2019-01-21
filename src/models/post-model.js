import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;

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
    type: [this],
    required: false
  }
});

export default mongoose.model('Post', PostSchema);

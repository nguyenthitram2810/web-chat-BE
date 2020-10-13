
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new mongoose.Schema({
  groupName: String,
  userIds: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  lastMessage: String, 
  lastUser: String,
  avatar: String,
}, {
  timestamps: true,
});
export default mongoose.model('conversations', schema);

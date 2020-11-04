
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      trim: true,
    },
    conversationID: [{
      type: Schema.Types.ObjectId,
      ref: 'conversations', 
    }],
    memberId: [{
      type: Schema.Types.ObjectId,
      ref: 'users',
    }],
}, {
  timestamps: true,
});
export default mongoose.model('messages', schema);

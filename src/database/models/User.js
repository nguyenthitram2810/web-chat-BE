import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: Number,
    username: {
        type: String, 
        required: true, 
        trim: true,
    },
    email: {
        type: String, 
        required: true, 
        trim: true,
    },
    password: {
        type: String, 
        required: true,
    }, 
    avatar: String,
}, {
    timestamps: true,
});
export default mongoose.model('users', schema);

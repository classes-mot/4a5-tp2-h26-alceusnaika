import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, required: true },
    game: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Game',
        }
    ],
});

export const User = mongoose.model('User', userSchema);
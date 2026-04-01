import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { Type: String, required: true },
    email: { Type: String, required: true },
    password: { Type: String, required: true },
    image: { Type: String, required: true },
    role: { Type: String, required: true },
    game: [
        {
            Type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Game',
        }
    ],
});

export const User = mongoose.model('User', userSchema);
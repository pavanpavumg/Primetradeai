import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: {
        type: String,
        required: true,
    },
    resetToken: String,
    resetTokenExpire: Date,
}, { timestamps: true });

export default mongoose.model("User", userSchema);

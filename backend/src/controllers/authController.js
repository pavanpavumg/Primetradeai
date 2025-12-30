import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
// import { transporter } from "../utils/mail.js"; // Removed for mock

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        });

        if (user) {
            const token = generateToken(user._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // set true in production
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // set true in production
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ message: "Logged out" });
};

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
};

export const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user, { name, email }, { new: true });
    res.json(user);
};

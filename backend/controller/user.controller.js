import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendResetEmail } from "../mailjet/emails.js";
import crypto from "crypto";

export const signUp = async(req, res) => {
    const {name, username, password, email} = req.body;

    try {
        if(!name || !username || !password || !email) {
            throw new Error("All field are required");
        }
        const usernameAlreadyExists = await User.findOne({username});
        if(usernameAlreadyExists) {
            res.status(400).json({success: false, message: "username already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random()* 900000).toString();
      
        const user = new User({
            name,
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        
         // jwt
         generateTokenAndSetCookie(res, user._id);

        //  verification email sending
         sendVerificationEmail(user.email, verificationToken)

        await user.save();

        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })


    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const verifyEmail = async(req, res) => {
    const {code} = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        });

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code"})
        }

        user.isVerified = true,
        user.verificationToken = undefined,
        user.verificationTokenExpiresAt = undefined

        await user.save();
        res.status(200).json({success: true, message: "Email verification successful"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const logIn = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const logOut = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"})
}

export const forgetPassword = async(req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success: false, message: "user not found"})
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send reset password email
        sendResetEmail(res, email, `${process.env.Client_URL}/reset-password/${resetToken}`);

    } catch (error) {
        
    }
}

export const resetPassword = async(req, res) =>{
    try {
        const {token} = req.params
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        });
        

        if(!user){
            return res.status(400).json({success: false, message: "Invalid or expired token"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();
        res.status(200).json({success: true, message: "Password reset successful"})
        
    } catch (error) {
        console.log(error)
        
    }

}

export const getUser = async(req, res) => {
    const user = await User.find();
    // const stringifyUser = JSON.stringify(user)

    res.send(user);
}

export const checkAuth = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) return res.status(400).json({success: false, message: "User not found"});

        res.status(200).json({success: true, user})
    } catch (error) {
        console.log("error in checkAuth", error);
        res.status(400).json({success: false, message: error.message})
    }
}
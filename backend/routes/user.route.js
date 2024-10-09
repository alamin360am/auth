import express from "express";
import { getUser, logIn, logOut, signUp, verifyEmail, forgetPassword, resetPassword, checkAuth } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/forget-password", forgetPassword)
userRouter.post("/reset-password/:token", resetPassword);

userRouter.get("/check-auth", verifyToken, checkAuth)
userRouter.get("/", getUser);



export default userRouter;
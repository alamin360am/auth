import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import bookRouter from "./routes/books.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter)
app.use("/api/books", bookRouter);

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`);
});
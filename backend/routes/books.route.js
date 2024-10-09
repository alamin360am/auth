import express from "express";
import { addBooks, getBooks } from "../controller/books.controller.js";

const bookRouter = express.Router();

bookRouter.post("/", addBooks);
bookRouter.get("/", getBooks);

export default bookRouter;
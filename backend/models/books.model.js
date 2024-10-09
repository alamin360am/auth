import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "তথ্য পাওয়া যায় নি"
    },
    author: {
        type: String,
        default: "কোন তথ্য নেই"
    },
    publication: {
        type: String,
        default: "তথ্য নেই"
    },
    category: {
        type: String,
        default: "ক্যাটাগরি নাই"
    },
    price: {
        type: Number,
        required: true
    },
    pages: {
        type: String,
        default: "তথ্য পাওয়া যায় নি"
    },
    inStock: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

export const Book = mongoose.model("Book", bookSchema);
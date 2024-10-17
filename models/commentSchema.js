import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: Object,
    question: String,
    questionRelies: [Object],
  },
  { timestamps: true }
);

export default commentSchema;

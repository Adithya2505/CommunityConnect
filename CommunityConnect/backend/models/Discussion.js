// models/Discussion.js
import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now },
});

const discussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Discussion", discussionSchema);

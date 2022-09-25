import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    title: { type: String, required: true, minLength: 3, maxLength: 60 },
    text: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
const postModel = mongoose.model("Post", postSchema);

export default postModel;

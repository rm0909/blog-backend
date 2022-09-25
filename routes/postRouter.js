import express from "express";
import postModel from "../models/Post.js";
import { cloudinaryMiddleware } from "../controllers/cloudinaryMiddleware.js";

const postRouter = express.Router();

//all
postRouter.get("/", async (req, res) => {
  try {
    const allPosts = await postModel.find({});
    if (allPosts == null) {
      return res.status(404).json("There is no post!");
    }
    res.status(200).json({ posts: allPosts });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
//by post id
postRouter.get("/:id", async (req, res) => {
  try {
    const postByID = await postModel.findById(req.params.id);
    if (postByID == null) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.status(200).json(postByID);
  } catch (error) {
    res.status(500).json({ message: "Error when finding post", error: error });
  }
});
//delete by id
postRouter.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await productModel.findByIdAndRemove(req.params.id);
    if (deletedPost == null)
      return res
        .status(404)
        .json({ message: "We couldn't find post with this id" });
    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error trying to delete", error: error });
  }
});
//post
postRouter.post("/new", async (req, res) => {
  const newPost = new postModel({
    title: req.body.title,
    text: req.body.text,
    image: req.body.image,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error trying to post your post!", error: error });
  }
});
//patch
postRouter.patch("/new/:id", cloudinaryMiddleware, async (req, res) => {
  let newPost = {};
  const { title, text, image } = req.body;
  if (title !== null) newPost.title = title;
  if (text !== null) newPost.title = title;
  if (image !== null) newPost.image = image;
  try {
    await postModel.findByIdAndUpdate(req.params.id, newPost);
    res.status(200).json({ message: "Post patched!" });
  } catch (error) {
    res.status(400).json({ message: "Error trying to patch", error: error });
  }
});

export default postRouter;

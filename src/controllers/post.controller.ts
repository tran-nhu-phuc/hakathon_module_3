import express from "express";
import PostService from "../services/post.services";
const postController = express.Router();
const postService = new PostService();
postController.get("/:idUser", postService.getAllPostByIdUser);
postController.post("/new_post/:idUser", postService.addNewPost);
export default postController;

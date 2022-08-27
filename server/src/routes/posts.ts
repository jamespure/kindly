import { IRouter, Router } from "express";
import {
  deletePost,
  disLikePost,
  getPost,
  getTimelinePosts,
  likePost,
  newPost,
  updatePost,
} from "../controllers/posts.controller";

const router: IRouter = Router();

// CREATE NEW POST
router.post("/", newPost);

// UPDATE POST
router.patch("/:_id", updatePost);

// DELETE POST
router.delete("/:_id", deletePost);

// LIKE A POST
router.patch("/:_id/like", likePost);

// LIKE A POST
router.patch("/:_id/dislike", disLikePost);

// GET A POST
router.get("/:_id", getPost);

// GET TIMELINE POSTS
router.get("/timeline/all", getTimelinePosts);
export default router;

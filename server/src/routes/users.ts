import { IRouter, Router } from "express";
import {
  deleteUser,
  getUser,
  updateUser,
  followUser,
  unfollowUser,
} from "../controllers/users.controller";
const router: IRouter = Router();

// UPDATE USER
router.patch("/:_id", updateUser);
// DELETE USER
router.delete("/:_id", deleteUser);
//GET A USER
router.get("/:_id", getUser);
// FALLOW A USER
router.patch("/:_id/follow", followUser);
// UNFALLOW A USER
router.patch("/:_id/unfollow", unfollowUser);

export default router;

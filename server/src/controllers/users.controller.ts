export { Request, Response } from "express";
import { User } from "../models/User";

type followings = string[] | undefined;

// FIND USER TO UPDATE
export const updateUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user)
      return res
        .status(403)
        .json({ message: "You can only update your profile" });
    await User.findByIdAndUpdate(req.params._id, {
      $set: req.body,
    });

    return res.status(200).json({ message: "update successful" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET A USER
export const getUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user)
      return res.status(404).json({ message: "This user does not exist" });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//DELETE A USER
export const deleteUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) return res.status(404).json({ message: "User does not exist" });
    await User.findByIdAndDelete(req.params._id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// FALLOW A USER
export const followUser = async (req: any, res: any) => {
  try {
    if (req.params._id === req.body.user_id)
      return res.status(403).json({ message: "you can not follow yourself" });
    const currentUser = await User.findById(req.params._id);
    const user = await User.findById(req.body.user_id);
    const followings: followings = currentUser!.followings;
    if (followings.includes(await req.body.user_id))
      return res.status(403).json("you allready follow this user");

    await user!.updateOne({ $push: { followers: req.params._id } });
    await currentUser!.updateOne({ $push: { followings: req.body.user_id } });
    res.status(200).json("user have been followed");
  } catch (err) {
    res.status(500).json(err);
  }
};

//UNFALLOW A USER
export const unfollowUser = async (req: any, res: any) => {
  try {
    if (req.params._id === req.body.user_id)
      return res.status(403).json({ message: "you can not unfollow yourself" });
    const currentUser = await User.findById(req.params._id);
    const user = await User.findById(req.body.user_id);
    const followings: followings = currentUser!.followings;
    if (!followings.includes(req.body.user_id))
      return res.status(403).json("you allready unfollow this user");

    await user!.updateOne({ $pull: { followers: req.params._id } });
    await currentUser!.updateOne({ $pull: { followings: req.body.user_id } });
    res.status(200).json("user have been unfollowed");
  } catch (err) {
    res.status(500).json(err);
  }
};

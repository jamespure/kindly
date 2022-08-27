import { Post } from "../models/Post";
import { User } from "../models/User";

// CREATE NEW POST
export const newPost = async (req: any, res: any) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// UPDATE POST
export const updatePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post!.user_id !== req.body.user_id)
      return res.status(403).json({ message: "you can only update your post" });
    await post!.updateOne({ $set: req.body });
    return res.status(200).json("post has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
};

// DELETE A POST
export const deletePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params._id);
    if (post!.user_id !== req.body.user_id)
      return res
        .status(403)
        .json({ message: "you can only delete your posts" });

    await post!.deleteOne();
    return res
      .status(200)
      .json({ message: "post have been deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//LIKE A POST
export const likePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params._id);
    const likes: string[] = post!.likes;
    if (likes.includes(req.body.user_id))
      return res.status(401).json({ message: "you already like this post" });

    await post!.updateOne({ $push: { likes: req.body.user_id } });
    await post!.updateOne({ $pull: { disLikes: req.body.user_id } });
    return res.status(200).json({ message: "you have like this post!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//DISLIKE A POST
export const disLikePost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params._id);
    const likes: string[] = post!.likes;
    if (!likes.includes(req.body.user_id))
      return res.status(401).json({ message: "you already dislike this post" });

    await post!.updateOne({ $pull: { likes: req.body.user_id } });
    await post!.updateOne({ $push: { disLikes: req.body.user_id } });
    return res.status(200).json({ message: "you have dislike this post!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//GET A POST
export const getPost = async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params._id);
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//GET TIMELINE POSTS
export const getTimelinePosts = async (req: any, res: any) => {
  try {
    const currentUser = await User.findById(req.body.user_id);
    const userPost = await Post.find({ user_id: currentUser!._id });
    const friendsPost = await Promise.all(
      currentUser!.followings.map((friendId) => {
        return Post.find({ user_id: friendId });
      })
    );
    res.status(200).json(userPost.concat(...friendsPost));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

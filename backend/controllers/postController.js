const Post = require("../models/postModel");
const User = require("../models/userModel");
const Filter = require("bad-words");
const fs = require("fs");
const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../utils/validateMongodbID");
const cloudinaryUploadImg = require("../utils/cloudinary");
const blockUser = require("../utils/blockUser");

//create post----------------------------------------------
const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //display message if user is blocked
  blockUser(req.user);
  //validateMongodbID(req.body.user)
  //check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);

  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and have been blocked"
    );
  }

  if(!req?.user?.isAccountVerified){
    throw new Error('Please verify Your Account And Go...')
  }

  //prevent user if his account is a starter account
  // if (
  //   req?.user?.accountType === "Starter Account" &&
  //   req?.user?.postCount >= 1
  // ) {
  //   throw new Error("Starter Account can only create two posts,Get more Followers");
  // }

  const localPath = `public/images/posts/${req.file.filename}`;
  // //upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create({
      ...req.body,
      user: _id,
      image: imgUploaded?.url,
    });

    //update the user post count
    await User.findByIdAndUpdate(
      _id,
      {
        $inc: { postCount: 1 },
      },
      {
        new: true,
      }
    );
    //remove uploaded img
    fs.unlinkSync(localPath);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//fetch all posts-----------------------------------------
const fetchPOstsCtrl = expressAsyncHandler(async (req, res) => {
  const hasCategory = req.query.category;
  //console.log(hasCategory)
  try {
    //check if it has a category
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate("user")
        .populate("comments")
        .sort("-createdAt");
      res.json(posts);
    } else {
      const posts = await Post.find({})
        .populate("user")
        .populate("comments")
        .sort("-createdAt");
      res.json(posts);
    }

    //res.json({totalPages:Math.ceil(total / pageSize),posts});
  } catch (error) {
    res.json(error);
  }
});

//fetch a single post
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes")
      .populate("comments");
    //update number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json("error");
  }
});

//update post-------------------------
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        // ...req.body,
        user: req?.user,
        description: req?.body?.description,
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//delete post----------------------------
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//Likes-----------------------------------------
const toggleAddLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  //find the post to be liked

  const { postId } = req.body;
  const post = await Post.findById(postId);
  //find the login user
  const loginUserId = req?.user?._id;

  //find the user has liked this post ?
  const isLiked = post?.isLiked;
  //check if this user has dislikes this post?
  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  // remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );

    res.json(post);
  }
  //Toggle
  //remove the user if  he has liked the post
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

//Dislikes---------------------------------------
const toggleAddDislikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  //find the post to be disliked
  const { postId } = req.body;
  const post = await Post.findById(postId);

  //find the login user
  const loginUserId = req?.user?._id;
  //check if this user has already dislikes
  const isDisLiked = post?.isDisLiked;
  //check if already like this poost
  const alreadyLiked = post?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );
  //remove this user from likes array if it exists
  if (alreadyLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }

  //Toggling
  //remove this user from dislikes if already disliked
  if (isDisLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

module.exports = {
  createPostCtrl,
  fetchPOstsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPostCtrl,
  toggleAddDislikeToPostCtrl,
};

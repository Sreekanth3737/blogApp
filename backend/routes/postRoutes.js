const express = require("express");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const {
  photoUpload,
  postImgResize,
} = require("../middlewares/upload/photoUpload");
const {
  createPostCtrl,
  fetchPOstsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPostCtrl,toggleAddDislikeToPostCtrl
} = require("../controllers/postController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  photoUpload.single("image"),
  postImgResize,
  createPostCtrl
);

router.put('/likes',authMiddleware,toggleAddLikeToPostCtrl)
router.put('/dislikes',authMiddleware,toggleAddDislikeToPostCtrl)

router.get("/", fetchPOstsCtrl);
router.get("/:id", fetchPostCtrl);
router.put("/:id", authMiddleware, updatePostCtrl);
router.delete('/:id',authMiddleware,deletePostCtrl)

module.exports = router;

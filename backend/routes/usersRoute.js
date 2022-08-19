const express = require("express");

const {
  userRegister,
  loginUserCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updatePasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordToken,
  passwordResetCtrl,
  profilePhotoUploadCtrl,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const {
  photoUpload,
  profilePhotoResize,
} = require("../middlewares/upload/photoUpload");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", loginUserCtrl);
router.put(
  "/profilephoto-upload",
  authMiddleware,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadCtrl
);
router.get("/", authMiddleware, fetchUserCtrl);
//password reset
router.post("/forget-password-token", forgetPasswordToken);
router.put("/reset-password", passwordResetCtrl);

router.put("/password", authMiddleware, updatePasswordCtrl);
router.put("/follow", authMiddleware, followingUserCtrl);

router.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationTokenCtrl
);

router.put("/verify-account", authMiddleware, accountVerificationCtrl);

router.put("/unfollow", authMiddleware, unfollowUserCtrl);
router.put("/block-user/:id", authMiddleware, blockUserCtrl);
router.put("/unblock-user/:id", authMiddleware, unBlockUserCtrl);

router.get("/profile/:id", authMiddleware, userProfileCtrl);
router.put("/:id", authMiddleware, updateUserCtrl);

router.delete("/:id", deleteUserCtrl);
router.get("/:id", fetchUserDetailsCtrl);

module.exports = router;

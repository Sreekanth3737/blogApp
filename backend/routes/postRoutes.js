const express=require('express')
const{createPostCtrl,fetchPOstsCtrl}=require('../controllers/postController')
const authMiddleware=require('../middlewares/auth/authMiddleware');
const { photoUpload, postImgResize } = require('../middlewares/upload/photoUpload');

const router=express.Router();

router.post('/',authMiddleware,photoUpload.single('image'),postImgResize,createPostCtrl)

router.get('/',fetchPOstsCtrl)
module.exports=router
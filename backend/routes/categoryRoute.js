const express=require('express');
const router=express.Router()
const authMiddleware = require("../middlewares/auth/authMiddleware");

const {createCategoryCtrl,fetchCategoriesCtrl,fetchCategoryCtrl,updateCategoryCtrl,deleteCategory}=require('../controllers/categoryController')

router.post('/',authMiddleware,createCategoryCtrl)
router.get('/',authMiddleware,fetchCategoriesCtrl)
router.get('/:id',authMiddleware,fetchCategoryCtrl)
router.put('/:id',authMiddleware,updateCategoryCtrl)
router.delete('/:id',authMiddleware,deleteCategory)

module.exports=router
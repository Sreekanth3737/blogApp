const expressAsyncHandler = require("express-async-handler");
const Category=require('../models/categoryModel')


const createCategoryCtrl=expressAsyncHandler(async(req,res)=>{
    try {
        const category=await Category.create({
            user:req.user._id,
            title:req.body.title,
        });
        res.json(category)
    } catch (error) {
       res.json(error) 
    }
});

//fetch all categories
const fetchCategoriesCtrl=expressAsyncHandler(async(req,res)=>{
    
    try{
        const categories=await Category.find({}).populate('user').sort('-createdAt')
        res.json(categories)
    }catch (error){
      res.json(error)  
    }
});

//fetch single category

const fetchCategoryCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params
    try{
        const category=await Category.findById(id).populate('user').sort('-createdAt')
        res.json(category)
    }catch (error){
      res.json(error)  
    }
});

//update category
const updateCategoryCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const updateCategory=await Category.findByIdAndUpdate(id,{
          ...req.body
            
        },{
            new:true,
            runValidators:true
        });
        res.json(updateCategory)
    } catch (error) {
        res.json(error)
    }
});

//delete category
const deleteCategory=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteCategory=await Category.findByIdAndDelete(id,{new:true})
        res.json(deleteCategory)
    } catch (error) {
      res.json(error)  
    }
})



module.exports={createCategoryCtrl,fetchCategoriesCtrl,fetchCategoryCtrl,updateCategoryCtrl,deleteCategory}
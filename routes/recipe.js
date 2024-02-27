//require express
const express = require('express')
const { test, addRecipe, getRecipes, getById, deleteRecipe, editRecipe } = require('../controllers/recipe')
const upload = require("../middlewares/multer")

//require router
const router = express.Router()

//test Route
router.get('/test',test)

//add recipe route
router.post('/addRecipe', upload.single("image"), addRecipe)

//get recipes 
router.get("/getRecipes",getRecipes)

//get recipe by id
router.get('/getRecipeById/:_id',getById)

//delete recipe
router.delete('/deleteRecipe/:_id',deleteRecipe)

//edit recipe
router.put('/editRecipe/:_id',  upload.single("image"), editRecipe)


//export  router 
module.exports=router
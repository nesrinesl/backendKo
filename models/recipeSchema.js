//require mongoose
const mongoose = require('mongoose')

//get schema
const Schema =mongoose.Schema

//create recipe schema
const recipeSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    time:{
        type:Number,
        required:true,
    },
    ingredients:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    profile_img: String,
    cloudinary_id: String,

},
    {
        timestamps:true
    })
    
    //export schema
module.exports = recipe = mongoose.model('recipe',recipeSchema)

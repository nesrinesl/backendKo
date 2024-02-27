//const mongoose
const mongoose =require('mongoose')

//get schema
const Schema = mongoose.Schema

//create user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String, // Assuming you'll store the image URL as a string
    },
  
}, { timestamps: true });

//export schema
    module.exports = User = mongoose.model('user',userSchema)


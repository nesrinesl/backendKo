const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// test route
exports.test = (req, res) => {
    try {
      res.status(200).send("test user ok");
    } catch (error) {
      res.status(400).send(error);
    }
};

//register
exports.register = async (req,res)=>{
    try {
        let {name,lastName,email,password}=req.body
        
        let foundUser = await User.findOne({email})
        if(foundUser){
          return res.status(400).send({errors:[{msg:"Email is alerady exist"}]})
        }
     const salt = 10
     
       let hashedPassword = await bcrypt.hash(password,salt)

        let newUser = await new User({...req.body})

         newUser.password = hashedPassword

        await newUser.save()

        const token = await jwt.sign({
            id:newUser._id
        },process.env.SECRET_KEY)

        res.status(200).send({success:[{msg:"Register Successfully ! "}],newUser,token})
    } catch (error) {
        res.status(400).send({errors:[{msg:"Register Failed"}],error})
   
    }
}

//login 
exports.login = async (req,res)=>{
  try {
    let {email,password}=req.body

    let foundUser = await User.findOne({email})
    if(!foundUser){
      return res.status(400).send({errors:[{msg:"Incorrect Email !"}]})
      }
        let hashedPassword = await bcrypt.compare(password,foundUser.password)
        if (!hashedPassword){
         return res.status(400).send({errors:[{msg:"Incorrect Password !"}]})
        }
        res.status(200).send({success:[{msg:`Hello ${foundUser.name},Welcome back !`}]})
  } catch (error) {
    res.status(400).send({errors:[{msg:"Login Failed!"}]})

  }
}



const jwt = require ('jsonwebtoken')
const userSchema = require('../models/userSchema')


const isAuth =async (req,res,next)=>{
    try {
        const token = req.headers ['authorization']

        if (!token){
            return res.status(400).send({errors:[{msg:"Not authorized 1 token not found"}]})
        }
        const decoded =jwt.verify(token,process.env.SECRET_KEY)
        const foundUser = await userSchema.findOne({_id: decoded.id})
        
        if (!foundUser){
            return res.status(400).send({errors:[{msg:"Not authorized 2 user not found"}]})
        }
        req.user =foundUser
        next()

    } catch (error) {
        return res.status(400).send({errors:[{msg:"Not authorized 3 "}]})
        
    }
}
module.exports = isAuth
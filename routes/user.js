//require express
const express = require('express')
const { test, register, login } = require('../controllers/user')
const {registerValidation,validator}=require('../middlewares/validator')
const isAuth = require('../middlewares/isAuth')
//require router
const router = express.Router()

//test Route
router.get('/test',test)

//register
router.post('/register',registerValidation(),validator,register)

//login
router.post('/login',login)

//current route
router.get('/current',isAuth,(req,res)=>{
    res.send(req.user)
})

//export  router 
module.exports=router
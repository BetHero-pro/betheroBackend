const express = require('express')
const router = express.Router()
const UserSchema = require('../models/userModel')
const {VerifyUser,AuthUser} = require('../controllers/userController')

//Routes
router.get('/',(req,res) =>{
    res.json({mssg:"Hello"})
})

router.get('/home',(req,res) =>{
    res.json({mssg:"Home"})
})

router.post('/userAuth',AuthUser)


module.exports = router
const express = require('express')
const router = express.Router()
const UserSchema = require('../models/userModel')
const {createUser} = require('../controllers/userController')

//Routes
router.get('/',(req,res) =>{
    res.json({mssg:"Hello"})
})

router.get('/home',(req,res) =>{
    res.json({mssg:"Home"})
})

router.post('/userAuth',createUser)

module.exports = router
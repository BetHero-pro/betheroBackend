const express = require('express')
const router = express.Router()
const UserSchema = require('../models/userModel')
const {AuthUser,StoreQuest,FetchQuest,DeleteQuest} = require('../controllers/userController')

//Routes
router.get('/',(req,res) =>{
    res.json({mssg:"Hello"})
})

router.get('/home',(req,res) =>{
    res.json({mssg:"Home"})
})

router.post('/userAuth',AuthUser)
router.post('/storeQuest',StoreQuest)
router.post('/fetchQuest',FetchQuest)
router.post('/deleteQuest',DeleteQuest)


module.exports = router
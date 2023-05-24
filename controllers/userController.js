const UserSchema = require('../models/userModel')
const saltRounds = 10

//Create a user
const createUser = async(req,res) =>{
    console.log('Creating user')
    return res.json({'msg':"Hello World"})
}





module.exports = {
    createUser
}
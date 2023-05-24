const UserSchema = require('../models/userModel')
const jwt = require('jsonwebtoken');
const saltRounds = 10
const secretKey = '5f14a0f6e297f4a1f8d81932b4ebe57c0e3a5e5e36929c2670e888cfb8f7e203'; // Replace with your own secret key


//Auth the user
const AuthUser = async(req,res) =>{
    var userName = req.body.userName
    console.log('Creating user')
    console.log(userName)
    
    //post to db
    try{
        const userdata = await UserSchema.create({userName: userName})
        return res.status(200).json(userdata)
    }catch(error){
        return res.status(400).json({error: error.message})
    }
    

}



module.exports = {
    AuthUser,
}
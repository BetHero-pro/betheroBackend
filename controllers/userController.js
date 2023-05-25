const UserSchema = require('../models/userModel')
const QuestSchema = require('../models/questModel')
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
        //check if uname already exists
        const checkuname = await UserSchema.find({userName: userName})
        if(checkuname.length != 0){
          console.log("username exists")
          return res.status(400).json({isUnameExist:true})
        }
        else{
          const userdata = await UserSchema.create({userName: userName})
          return res.status(200).json(userdata)
        }
      }catch(error){
          return res.status(400).json({error: error.message})
      }
}

const StoreQuest = async(req, res) => {
    var userID = req.body.userID 
    var Quest = req.body.Quest
    console.log(userID)
    const quest = await questModel.create({ID: userID,Quest:Quest})
    return res.status(200).json(quest)
}

const FetchQuest = async(req, res) => {
    var userID = req.body.userID
    try{
        const findQuest = await QuestSchema.find({ID:userID})
        return res.status(200).json(findQuest)
    }
    catch{
        return res.status(400).json({doesNotexist:true})
    }

}
const DeleteQuest = async(req, res) => {
    var questID = req.body.questID
    try{
        const deleteQuest = await QuestSchema.findByIdAndDelete({questID})
        return res.status(200).json(deleteQuest)
    }
    catch{
        return res.status(400).json({doesNotexist:true})
    }

}



module.exports = {
    AuthUser,
    StoreQuest,
    FetchQuest,
    DeleteQuest
}
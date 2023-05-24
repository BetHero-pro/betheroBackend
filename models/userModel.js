const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    
   
}, {timestamps: true})


module.exports = mongoose.model('Users',UserSchema)
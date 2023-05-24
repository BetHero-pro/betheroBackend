const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    
   
}, {timestamps: true})


module.exports = mongoose.model('Users',UserSchema)
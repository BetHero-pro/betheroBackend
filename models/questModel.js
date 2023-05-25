const mongoose = require("mongoose")

const Schema = mongoose.Schema

const QuestSchema = new Schema({
    ID:{
        type: 'String',
        required: true,
    },
    Quest:{
        type: String,
        required: true
    },
    
   
}, {timestamps: true})


module.exports = mongoose.model('Quests',QuestSchema)
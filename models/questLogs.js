const mongoose = require("mongoose")

const Schema = mongoose.Schema

const LogsSchema = new Schema({
    USERID: {
        type: 'String',
        required: true,
    },

    Name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'n/a'
    }


}, { timestamps: true })


module.exports = mongoose.model('Logs', LogsSchema)
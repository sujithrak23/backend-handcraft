//import mongoose
const mongoose = require('mongoose')

//defining schema
const userDetailsSchema = new mongoose.Schema({
    username : {
        type : String
    },
    emailID : {
        type: String
    },
    password : {
        type : String
    }
},{versionKey: false})

//creating model
const User = mongoose.model('UserDB',userDetailsSchema)

//exporting User module
module.exports = { User }
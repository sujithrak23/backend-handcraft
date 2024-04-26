//import mongoose
const mongoose = require('mongoose')

//defining schema
const productDetailsSchema = new mongoose.Schema({
    url : {
        type: String
    },
    title : {
        type: String 
    },
    category : {
        type : String
    },
    amount : {
        type: String
    },
    company : {
        type: String
    },
    userID : {
        type : String
    }
},{versionKey: false})

//creating model
const Product = mongoose.model('ProductDB',productDetailsSchema)

//export Expense module
module.exports = { Product }

const {User} = require('../models/User.js')

const jwt = require('jsonwebtoken')

const secretKey = 'super'

function generateToken(UserDetails){
  return jwt.sign(UserDetails, secretKey)
}

async function createUser(request,response){
    try{
    const user = await User.find({"emailID" : request.body.emailID})
    if(user.length === 0){
        const user = await User.create({
            "username" :  request.body.username,
            "emailID" : request.body.emailID,
            "password" : request.body.password
    })
    const UserDetails = {
        "username":user.username, 
        "emailID":user.emailID,
        "userID" : user._id.toString()
    }
    const accessToken = generateToken(UserDetails)
    response.status(200).json({
        "status" : "success",
        "message" : "new user created",
        "accessToken" : accessToken,
        "UserDetails" : UserDetails
    })
    }else {
        response.status(409).json({
            "status" : "failure",
            "message" : "user already exist",
         })
    }
 }
     catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "user not created",
            "error" : error
         })
   }
}


async function validateUser(request,response){
    try{
        const user = await User.find({"emailID" : request.body.emailID,"password" : request.body.password})
        if(user.length === 0){
            response.status(401).json({
                "status" : "failure",
                "message" : "user does not exists",
            })
        }else {
            const UserDetails = {
                "username":user[0].username, 
                "emailID":user[0].emailID,
                "userID" : user[0]._id.toString()
            }
            const accessToken = generateToken(UserDetails)
            response.status(200).json({
                "status" : "sucess",
                "message" : "user exists",
                "accessToken" : accessToken,
                "UserDetails" : UserDetails
             })
        }
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "authentication failed",
            "error" : error
        })
    }
}



module.exports = {createUser,validateUser}
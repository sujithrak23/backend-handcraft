//importing 
const express = require('express')
const { addProduct,getProduct } = require('../controllers/productController')

const router = express.Router()
const jwt = require('jsonwebtoken')

const secretKey = 'super'

function authenticateToken(request,response,next){
    try{
        const authHeader = request.headers.authorization
        const accessToken = authHeader && authHeader.split(' ')[1]
        if(accessToken){
        jwt.verify(accessToken, secretKey, (error, UserDetails) => {
            if(error){
                response.status(401).json({
                    "status" : "failure",
                    "message" : "access denied"
                })
            }else{
                next()
            }           
        })
        }
        else{
            response.status(201).json({
                "status" : "failure",
                "message" : "access token not found",
            }) 
        } 
    }catch(error){
        response.status(401).json({
            "status" : "failure",
            "message" : "access denied",
        })
    }
}

router.post('/new-product/:userID', authenticateToken, addProduct)
router.get('/all/:userID', authenticateToken, getProduct)

module.exports = router
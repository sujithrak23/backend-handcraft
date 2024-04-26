const {Product} = require("../models/Product")

async function addProduct(request,response){
    try{
        await Product.create({
            "url" :  request.body.url,
            "title" :  request.body.title,
            "category" : request.body.category,
            "amount" :  request.body.amount,
            "company" :  request.body.company,
            "userID" : request.params.userID
           })
           response.status(201).json({
            "status" : "success",
            "message" : "entry created"
        })
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
}

async function getProduct(request,response){
    try{
      const getdetails = await Product.find({"userID" : request.params.userID})
      response.status(200).json(getdetails)
    }catch(error){
       response.status(500).json({
          "status" : "failure",
          "message" : "could not fetch data",
          "error" : error
       })
    }
}


module.exports = { addProduct, getProduct }
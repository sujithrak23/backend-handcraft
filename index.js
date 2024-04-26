const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')

const app = express();
app.use(bodyParser.json());
app.use('/user',userRoutes);
app.use('/product',productRoutes)

async function connectDB(){
  try{
    await mongoose.connect('mongodb+srv://sujithrakamaraj:DciFIKVnnISGGjbg@cluster0.6pu5cys.mongodb.net/HandMade-Hub?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB connection established')
    app.listen(4000,function(){
        console.log('listening to the port 4000')
    })
  }catch(error){
    console.log(error)
    console.log("having error in DB connection")
  }
}

connectDB()




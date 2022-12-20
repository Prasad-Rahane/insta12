//const dotenv = require("dotenv").config();
const express = require('express')
const app = express()
const mongoose = require('mongoose') 
const PORT = 5000;

const {MONGOURI} = require('./config/dev')


mongoose.set('strictQuery', true)
mongoose.connect(MONGOURI)


mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo")
})


mongoose.connection.on('error',(err)=>{
    console.log("Error connecting to mongo",err)
})


require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,() => {
    console.log(`App listening at http://localhost:${PORT}`);
});

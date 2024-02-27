// require express
const express = require ('express')

// create instance 
const app = express()

// bodyParser 
app.use(express.json())

//require dotenv
require('dotenv').config()

//create PORT 
const PORT = process.env.PORT1 || process.env.PORT2 

//create server 
app.listen(PORT,(err)=>{
    err? console.log(err)
    :console.log(`server is running at http://127.0.0.1:${PORT}`)
}
)
//require connectDB function 
const connect = require ('./config/connectDB')
connect()

//require recipe route
app.use('/api/recipes',require('./routes/recipe'))


//require auth route
app.use('/api/auth',require('./routes/user'))


app.use((req,res)=>{
    res.send("API is running !")
})
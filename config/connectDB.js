//require mongoose
const mongoose = require('mongoose')

//function connect to DB 
const connect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('connect to DataBase Successfully !!')
    } catch (error) {
        console.log(error)
    }
}

//export function connect 
module.exports = connect
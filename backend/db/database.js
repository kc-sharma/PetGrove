const mongoose = require("mongoose");

const connectDatabase = ()=>{
    require("dotenv").config({
        path: ".env"
    })    
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`mongodb connected with the server: ${data.connection.host}`)
    })
}

module.exports = connectDatabase;
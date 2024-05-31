const mongoose = require("mongoose");

require("dotenv").config();

// connect create DataBase
const dbConnect = async(req,res)=>{
     mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
    .then( console.log("Connected DataBase Successfully !!"))
    .catch((err)=>{
        console.log("Error Received not connected DB");
        console.error(err);
        // At the end terminate the process
        process.exit(1);
    })
};

module.exports = dbConnect;
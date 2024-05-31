const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse body 
app.use(express.json());

// mount
const blogRoute = require("./router/blogRoute");
app.use("/api/v1",blogRoute);

// connet DataBase
const dbConnect = require("./config/database");
dbConnect();

// run server
app.listen(PORT,(req,res)=>{
    console.log(`Server started successfully ${PORT}`);
 });
 

// Default Connection
app.get("/",(req,res)=>{
    res.send(`<h2> This is Default Page </h2>`);
});
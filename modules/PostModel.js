const mongoose = require("mongoose");
// const Likes = require("./likeModel");
// const Comments = require("./CommentModel");

// route Handler
const postSchema = new mongoose.Schema(
    { 
    title:{
       type:String,
       required:true,
    },

    body:{
      type:String,
      required:true,
    },

    likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Likes",
    }],

    comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comments",
    }]
  }
);

module.exports = mongoose.model("Posts",postSchema);
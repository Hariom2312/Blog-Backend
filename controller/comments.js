// import Comment and Post Model
const Comment = require("../modules/CommentModel");
const Posts = require("../modules/PostModel");

// Build Logic for every Route event
exports.getAllComment = async (req,res)=>{
   try{
        // fetch data from req body
        const comment = await Comment.find();
        res.json({
            Comments:comment,
        })
    }
    catch(err){
        console.log("Error Found",err);
        console.error(err);
        res.status(500).json({
            success:false,
            error: err.meassage,
            data:"Error Found"
        })
   }   
}



exports.commentCreate = async (req,res)=>{
    try{
        // create Comment

        // fetch data from req body
        const {post,user,body} = req.body;
        
        //  create a comment object
        const comment = new Comment({
            post,user,body
        })
        
        // save the new comment into the database
        const savedComment = await comment.save();
        
        // find the post by id
        const updatedPost = await Posts.findByIdAndUpdate(post, 
            {$push: {comments:savedComment._id}},
            {new:true}
        )
        // Populate the comments array with comment documents
        // .populate("comments")
        .exec();

        res.json({
            post:updatedPost
        })
    }
    catch(err){
        console.log("Error Found",err);
        console.error(err);
        res.status(500).json({
            success:false,
            error: err.meassage,
            data:"Error while creating comment"
        })
    }
}




exports.deleteComment = async (req,res)=>{
    try{
        // fetch
        const {post,comment} = req.body;

        //  find and delete the Comment collection
        const deletedComment = await Comment.findOneAndDelete(
            {post:post, _id:comment}
        );

        // update unlikes
        const updatedPost = await Posts.findByIdAndUpdate(post,
            {$pull: {comments: deletedComment._id}},
            {new: true}
        )
        .exec();
        
        res.status(200).json({
           post:updatedPost,
        })
    }
    catch(err){
        console.log("Error Found",err);
        console.error(err);
        res.status(500).json({
            success:false,
            error: err.meassage,
            data:"Error Found not deleted Comment"
        })
    }
}
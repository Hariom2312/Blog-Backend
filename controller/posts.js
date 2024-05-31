const Posts = require("../modules/PostModel");

// Build Logic for every Route event
exports.getAllPost = async (req,res)=>{
    try{
        // fetch Post
        const posts = await Posts.find({})
        // .populate("comments")
        // .populate("likes")
        .exec();
    
        res.status(200).json({
            posts:posts,
        })
    }
    catch(err){
        console.log("Error Found",err);
        console.error(err);
        res.status(500).json({
            success:false,
            error: err.meassage,
            data:"Error Found to get all post"
        })
    }
}

exports.postCreate = async (req,res)=>{
    try{
       
        // fetch 
        const {title,body} = req.body;
       
        //    object 
        const post = new Posts({
               title,body,
        });
        
        // save Post
        const savePost =await post.save();
        res.status(200).json({
            post:savePost,
            message:"SuccesFully !!"
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
};
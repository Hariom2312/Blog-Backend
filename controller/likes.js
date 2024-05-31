const Likes = require("../modules/likeModel");
const Posts = require("../modules/PostModel");

// Build Logic for every Route event
exports.likePost = async (req,res)=>{
    try{

        // fetch
        const {post,user} = req.body;
       
        // object
        const like = new Likes({
            post,user,
        });

        // update likes
        const savedLike = await like.save();

        // update post collection
        const updatedPost = await Posts.findByIdAndUpdate(post,
            {$push:{likes:savedLike._id}},
            {new:true}
        )
        .populate("likes")
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
            data:"Error Found"
        })
    }
}

exports.unLikePost = async (req,res)=>{
    try{
        // fetch
        const {post,like} = req.body;
        //  find and delete the like collection
        const deletedLike = await Likes.findOneAndDelete(
            {post:post, _id:like}
        );

        // update unlikes
        const updatedPost = await Posts.findByIdAndUpdate(post,
            {$pull: {likes: deletedLike._id}},
            {new: true}
        )
        .populate("likes")
        // .populate("comments")
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
            data:"Error Found"
        })
    }
}
const express = require("express");
const router = express.Router();

// Import All the Required Contoller
const {getAllPost,postCreate} = require("../controller/posts");
const {likePost,unLikePost} = require("../controller/likes");
const {getAllComment,commentCreate,deleteComment}= require("../controller/comments");

// Mapping the Route 
router.get("/posts",getAllPost);
router.post("/posts/create",postCreate);

router.post("/likes/like",likePost);
router.post("/likes/unlike",unLikePost);

router.get("/comments",getAllComment);
router.post("/comments/create",commentCreate);
router.post("/comments/deleted",deleteComment);

const {dummyRoute} = require("../controller/dummyRoute");
router.get("/dummyroute",dummyRoute);

// exports
module.exports = router;
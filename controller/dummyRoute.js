exports.dummyRoute = async(req,res)=>{
   try{
      res.send("This is Dummy Page");
    //   res.status(200).json({
    //      success:true,
    //      data:`<h1> This is Default Page `,
    //      message:"Successful Run this Page",
    //   });
   }
   catch(err){
        console.log("Error Received",err);
        console.error(err);
        res.status(500).json({
           success:false,
           message:"Error Received",
           error:err.message,
        });
   }
};

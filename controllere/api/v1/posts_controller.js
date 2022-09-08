const { findById } = require("../../../modals/Post");
const Post = require("../../../modals/Post");
const User = require('../../../modals/User');

//CREATING A NEW POST
module.exports.createPost= async(req,res)=>{
    try{
        // console.log("userid in create post",req.body.userId)
        const post = new Post({
            desc:req.body.desc ||"hi i am default post",
            image:req.body.image ||"default.img",
            user:req.body.userId
        });
        const user = await User.findById(req.body.userId);
        const newPost = await post.save();
        console.log(" create post checking for id",post.id)
        if(user){
            await user.updateOne({$push:{posts:post.id}});
           // return res.status(200).json()
        }
        return res.status(200).json({message:"post created succesfully",data:newPost})
    }catch(err){
        return res.status(500).json({data:err.message})
    }
};

//UPDATING A POST
module.exports.updatePost= async(req,res)=>{
    try{
        console.log("updating post")
     const post=   await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
     console.log("post updated",post)
     return res.status(200).json({message:"post updated succesfully", data:post})
    }catch(err){
        return res.status(500).json({message:"error ocurred while updating post",data:err.message})
    }
};

//Deleting a post
module.exports.deletePost= async(req,res)=>{
    try{
        const post=   await Post.findByIdAndDelete(req.params.id);
        const user = await User.findById(req.body.userId);
        console.log("user",user)
        if(user.posts.includes(req.params.id)){
            await user.updateOne({$pull:{posts:req.params.id}})

        }
        else{
            return res.status(500).json({message:"this post doesn't belong to the user"})
        }
        return res.status(200).json({message:"post deleted succesfuly"})
    }catch(err){
        return res.status(500).json({message:"error ocurred while deleting post",data:err.message})
    }
};

//getting a post by id
module.exports.getPost= async(req,res)=>{
    try{
        const post  = await Post.findById(req.params.id);
        return res.status(200).json({message:"post with id found succesfully ", data:post})
    }catch(err){
        return res.status(500).json({message:"error in getting post with following id",data:err.message})
    }
};

//getting all the posts from database that are related to current login user
module.exports.getAllPostsFromDatabase =async(req,res)=>{
    try{
        // const userIds = [];
        // userIds.push(req.body.userId)
        //TO USE FOR PAGINATION
        const {page} = req.query;
        const limit =2;
        const skipDoc = (page-1) * limit;
        

          const user = await User.findById(req.body.userId);

          //COUNT DOCUMENT
          const totalCount = await Post.countDocuments({}).exec()


          //FUTURE CHANGES WE HAVE TO SHOW POSTS OF FOLLOWERS ONLY
          const followings = user.followings
          followings.push(req.body.userId)
          console.log("followings",followings)
        //  console.log("userIds",userIds)
           await Post.find({"user":{$in:followings}}, (err,result)=>{
            if(err){
                console.log("err while querryoing",followings)
                return res.status(500).json({success:false,err:err})
            }else{

                return res.status(200).json({success:true, data:[...result], totalCount:totalCount})
            }
        //   }).populate({path:"user", select:"username profilePicture"}).clone()
        }).populate({path:"user", select:"username profilePicture"}).skip(skipDoc).limit(limit).clone()
        //   return res.status(200).json({success:true, data:posts})
    }catch(err){
        console.log("catch err",err)
        return res.status(500).json({success:false ,err:err.message})
    }
}
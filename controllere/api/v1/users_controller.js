const User = require('../../../modals/User');

const bcrypt = require('bcrypt');
const saltRounds = 10;

//UPDATING USER INFO
module.exports.updateUser = async(req,res) =>{
    try{
        const userId = req.params.id
        const password = req.body.password
     
        if(req.body.userId ===req.params.id ){
            if(password){
                try{
                    const salt = await   bcrypt.genSalt(saltRounds);
                    req.body.password = await bcrypt.hash(req.body.password,salt);
                }catch(err){
                    return res.status(500).json({message:"error ocurred while bcrypting password", data:err.message});
                }
            }
            try{
                // const user = await User.findByIdAndUpdate(req.params.id,{ $set: req.body});
                // const user = await User.findById(req.params.id);
                // if(user.id === req.body.userId){
                    const user = await User.findByIdAndUpdate(req.params.id,{ $set: req.body});
                    return res.status(200).json({message:'User info updated successfuly',data:user})
                // }
               // console.log("user updated")
              //  return res.status(200).json({message:'User info updated successfuly',data:user})
            }catch(err){
                return res.status(500).json({message:"you are not authorized to update user",data:err.message});
            }
        }


        // }else{
        //    return res.status(400).json({message:"You are authorized to update your account only"})
        // }
    }catch(err){
        return res.status(500).json({message:"error ocurred while updating user",data:err.message});
    }
}

//DELETING USER FROM DB
module.exports.deleteUser = async(req,res)=>{
    try{     
        if(req.body.userId ===req.params.id ){
            try{
                //finding user with user id and if user exist then delete

                // const user = await User.findById(req.params.id);
                // if(user.id === req.body.userId){
                    const user = await User.findByIdAndDelete(req.params.id);
                    return res.status(200).json({message:'User deleted successfuly'})
                // }

            }catch(err){
                return res.status(500).json({data:err.message});
            }
        }
        // }else{
        //    return res.status(400).json({message:"You are authorized to delete your account only"})
        // }
    }catch(err){
        return res.status(500).json({data:err.message});
    }
}

//GET USER INFO FROM DATABASE
module.exports.getUserInfo = async(req,res)=>{
    try{     
                //finding user with user id 
           if(req.body.userId === req.params.id) { 
                const user = await User.findById(req.params.id);
                return res.status(200).json({message:'User info fetched successfuly', data:user})
            }
            else{
                return res.status(501).json({message:"unauthorized to get userinfo"})
            }
    }catch(err){
        return res.status(500).json({data:err.message});
    }
}

//FOLLOW A USER
module.exports.followUser = async(req,res)=>{

    try{
        // if( req.body.userId ===req.params.id){
        if( req.body.userId !==req.params.id){

            const user = await User.findById(req.params.id);
            const  currentUser = await User.findById(req.body.userId);
            console.log("user",user)
            console.log("currentUser",currentUser)
            if(!user.followers.includes(req.body.userId)) {
               // console.log("!user.followers.includes(req.body.id)",!user.followers.includes(req.body.id))
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}})
                console.log("user has been followed by you")
               return res.status(200).json({message:"user has been followed by you"})
            } else{
                console.log("user is already followed by current user")
               return res.status(403).json({message:'user is already followed by current user'})
             }
        }else{
            console.log("ou cannot follow yourself")
            return res.status(403).json({message:'ou cannot follow yourself'})
         }
        // }
        //  else{
        //     return res.status(403).json({message:'you are not authorized to follow '})
        //  }

    }catch(err){
        console.log("oops an error is ocurred while trying to follow",err)
        return res.status(500).json({message:"oops an error is ocurred while trying to follow", err:err})
    }
}

//UNFOLLOW A USER
module.exports.unfollowUser = async(req,res)=>{
    try{
        if(req.params.id !== req.body.userId){
            try{
               const currentUser  = await User.findById(req.body.userId);
               const user  = await User.findById(req.params.id);
            //    const {followers} =user;
            //    const {followings} = currentUser
              if(user.followers.includes(req.body.userId)) {
                       await user.updateOne({$pull:{followers:req.body.userId}});
                       await currentUser.updateOne({$pull:{followings:req.params.id}})
                    return   res.status(200).json({message:"user has been unfollowed by you"})
   
           } 
               else{
                  return res.status(403).json({message:'you do not follow the user'})
               }
              
             
            }catch(err){
               return res.status(500).json({message:"an error ocurred while performing the unfollowing operation",err:err.message})
            }
           }else{
               return res.status(403).json({message:"you cannot follow yourself"})
           }
    }catch(err){
        return res.status(500).json({message:'an error ocurred while trying to unfollow ',err:err.message})
    }
}
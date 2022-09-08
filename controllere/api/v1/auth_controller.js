const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const User = require('../../../modals/User');


//REGISTERING A USER
module.exports.register = async(req,res)=>{
    try{
       // console.log("username",req.body.username);
// console.log("email",req.body.email);
// console.log("password",req.body.password);
        //GENERATE NEW ENCRYPTED PASSWORD
    const emailAlreadyExist = await User.findOne({email:req.body.email})
       if(emailAlreadyExist){
       return res.status(400).json({message:"Email already exist"})
       }
     
     
       const usernameAlreadyExist = await User.findOne({username:req.body.username})
       if(emailAlreadyExist){
       return res.status(400).json({message:"UserName already exist"})
       }

     const salt = await   bcrypt.genSalt(saltRounds);
     const hashedPassword = await bcrypt.hash(req.body.password,salt);

// console.log("hashedpassword",hashedPassword)

     //CREATING NEW USER 
     const newUser= new User ({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
     })

     //SAVE USER IN DB AND SEND RESPONSE
     const user = await newUser.save();
    return res.status(200).json({message:"user registerd succesfully", data:user})

    }catch(err){
      return res.status(500).json({message:"registe failed due to some error",data:err.message})
    }
}

//LOGIN A USER
module.exports.login = async(req,res)=>{
    try{
        const email = req.body.email;
        const password= req.body.password;
        // console.log("password",password)
     const user =  await User.findOne({email:email})
    //  console.log("user",user)
     if(!user){
       return res.status(404).json({message:"user does not exist"})
     }
     const passwordMatched = await bcrypt.compare(password, user.password);
   const token=  jwt.sign({
      userId: user.id,
      username:user.username ,
      email:user.email
    }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

     if(!passwordMatched){
       return res.status(400).json({message:"oops password is incorrect"})
     }

    return res.status(200).json({message:"Login succesfully",data:token})
    }catch(err){
        return res.status(500).json({message:"Login failed due to some error",data:err.message})
    }
}
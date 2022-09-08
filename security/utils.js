
var jwt = require('jsonwebtoken');

const extractTokenFromHeader = (req)=>{
   // console.log("REQ.HEADERS",req.headers)
    if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
        return req.headers.authorization.split(' ')[1]
    } return undefined;
};

module.exports.verifyToken = (req,res,next)=>{
    try{
        const token = extractTokenFromHeader(req);
       // const token = req.headers.authorization.split(' ')[1];
       // console.log("token",token)
        if(!token){
            return res.status(500).json({message:"unauthorized ", data:"token not found"})
        }
        const decoded=  jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("decoded",decoded)
        req.body.userId = decoded.userId;
        if(decoded){
            next();
        }
       
    }catch(err){
        return res.status(500).json({message:"token verification failed",data:err.message})
    }

}

// const tokenDecode = (req,res)=>{
//     try{
//         const token = extractTokenFromHeader(req);
//         if(!token){
//             return res.status(500).json({message:"unauthorized ", data:"token not found"})
//         }
//         const jwtPayload = verify(token, JWT_SECRET_KEY);

//         return{
//             userId: jwtPayload.userId
//         }

//     }catch(err){
//         return res.status(500).json({message:"token decode failed",data:err.message})
//     }
// }

// export{
//     extractTokenFromHeader,
//     verifyToken
// }
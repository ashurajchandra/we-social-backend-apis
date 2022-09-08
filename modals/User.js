const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        max:20,
        min:3
    },
    email:{
        type:String,
        require:true,
        unique:true,
        max:30,
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:'',
    },
    coverPicture:{
        type:String,
        default:'',
    },
    followers:{
        type:Array,
        default:[],
    },
    followings:{
        type:Array,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
      from: {
        type: String,
        max: 50,
      },
      relationship: {
        type: Number,
        enum: [1, 2, 3],
      },
      posts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Post"
        }
      ]
},{timestamps:true});

module.exports = mongoose.model('User',userSchema)
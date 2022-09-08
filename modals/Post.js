const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    image:{
        type:String,
        default:'',
    },
    desc: {
        type: String,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
},{timestamps:true});

module.exports = mongoose.model('Post',postSchema)
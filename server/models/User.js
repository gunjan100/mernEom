const { model, Schema } = require("mongoose")

const userSchema = new Schema({
    uname:{
        type:String,
        require:true
    },
    uemail:{
        type:String,
        require:true
    },
    uMobile:{
        type:String,
        require:true
    },
    uPass:{
        type:String,
        require:true
    },
    role:{
        type:Boolean,
        default:false
    }

})

const User = new model("User", userSchema)
module.exports = User;
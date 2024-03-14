const User = require("../models/User");
const { hashPass, compPass } = require("../helper/authHelper");
const JWT = require('jsonwebtoken')

const registerUser = async (req, resp) => {
  try {
    const { name, email, contact, password } = req.body;

     const existingUser = await User.findOne({ uemail: email });
    if (existingUser) {
      return resp.status(401).json({ success: false, msg: "User already exists." });
    }
   else{
    const hashedPass = await hashPass(password);

    const userData = await User.create({
      uname: name,
      uemail: email,
      uMobile: contact,
      uPass: hashedPass,
    });

    resp.status(200).json({ success: true, userData, msg: "Registered successfully." });
  }
  } catch (error) {
    console.error("Error registering user:", error);
    resp.status(500).json({ success: false, msg: "An error occurred while registering. Please try again later." });
  }
};



const logINuser = async(req, resp) =>{
  const {email, pass} = req.body
  const secretKey = process.env.SECRET_KEY
  
  try {
    
    const userD = await User.findOne({uemail:email})
    if (!userD) {
      return resp.status(401).json({ success: false, msg: "User not found" });
    }
    const comparedPassword = await compPass(pass, userD.uPass)
    
    if(!comparedPassword){
      return resp.status(404).json({success:false, msg:"password not match"})
    }
     
    const token = await JWT.sign({id:userD._id, email:userD.uemail, name:userD.uname, isAdmin:userD.isAdmin}, secretKey,{expiresIn:"7d"})


    resp.status(200).json({success:true, msg:"LogIN Successfully ..", token, userData:{
      name:userD.uname,
      email:userD.uemail,
      mobile:userD.uMobile
    } })
    
  } catch (error) {
    console.log(error);
    
  }

}

const user = async(req, resp)=>{
  try {
    // req.user is coming from authMiddleware after veryfying the token coming from fr end with the help of authmoddle ware we can accces this property any where req.user
    const userD = req.user    
    return resp.status(200).json({msg:"protected route..", userD})
  } catch (error) {
    console.log(error);
  }

}

module.exports = { registerUser , logINuser, user};

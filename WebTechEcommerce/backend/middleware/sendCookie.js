import jwt from "jsonwebtoken";

export const sendCookies = (admin,res,message,statusCode=200)=>{
 
    const token = jwt.sign({_id:admin._id},process.env.jwt_secret)
    res.status(statusCode || 201).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite:process.env.NODE_ENV=="development"? "lax":"none",
        secure:process.env.NODE_ENV=="development"? false:true,

    }).json({
        success:true,
        message: message || "Successfully registered",
    });
}
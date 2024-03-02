import jwt from "jsonwebtoken";
import { Admin } from "../models/AdminModel.js";

export const isAuthenticated = async (req,res,next)=>{

    // const { token } = req.cookies;
    const token = req.cookies.token
    console.log(token)
    if (!token) return res.status(404).json({
       success:false,
       message:"Login First",
   });
    
    const decoded =  jwt.verify(token,process.env.jwt_secret);
    console.log(decoded)
    req.admin = await Admin.findById(decoded._id);
    if (!req.admin) console.log("not found")
    next();
}
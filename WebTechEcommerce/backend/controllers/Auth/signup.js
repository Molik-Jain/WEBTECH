import { Admin } from "../../models/AdminModel.js";
import ErrorHandler from "../../middleware/error.js";
import bcrypt from "bcrypt"
import { sendCookies } from "../../middleware/sendCookie.js";

export const registerAdmin = async (req, res, next) => {
    const {
      email,
      password,
      name
    } = req.body;
    
    console.log(req.body)
    
    try {
      let admin = await Admin.findOne({ email });
  
      if (admin) return next(new ErrorHandler("user Already Exist", 400));
  
      const hashpass = await bcrypt.hash(password, 10);
      admin = await Admin.create({
        email,
        name,
        password: hashpass,
      });
      sendCookies(admin, res, "Register Success", 201);
    } catch (error) {
      // console.log(error)
      next(error);
    }
  };
  
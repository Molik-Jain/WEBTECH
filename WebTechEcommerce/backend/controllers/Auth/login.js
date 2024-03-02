import { Admin } from "../../models/AdminModel.js";
import ErrorHandler from "../../middleware/error.js";
import { sendCookies } from "../../middleware/sendCookie.js";
import bcrypt from "bcrypt";

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or password",
      });

    sendCookies(admin, res, `Welcome Back, ${Admin.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res) => {
  //   console.log("reached here at getprofile")
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};
export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      sameSite: process.env.NODE_ENV == "development" ? "lax" : "none",
      secure: process.env.NODE_ENV == "development" ? false : true,
      // sameSite:process.env.NODE_ENV === "Development"? "lax" : "none",
      // secure:process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};

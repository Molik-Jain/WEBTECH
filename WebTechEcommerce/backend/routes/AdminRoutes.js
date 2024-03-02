import express from "express";
import { isAuthenticated } from "../middleware/Auth.js";
import { getProfile, loginAdmin, logout } from "../controllers/Auth/login.js";
import { registerAdmin} from "../controllers/Auth/signup.js";

const router = express.Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/getprofile").get(isAuthenticated,getProfile)
router.route("/logout").get(isAuthenticated,logout)

export default router;

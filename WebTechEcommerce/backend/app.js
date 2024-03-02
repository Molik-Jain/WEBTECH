import express from "express";
import { config } from "dotenv";
import Cors from "cors";
import cookieParser from "cookie-parser";
import ProductRouter from "./routes/ProductRoutes.js"
import AdminRoutes from "./routes/AdminRoutes.js"
import paymentRouter from "./routes/PaymentRoutes.js"
 
config({path:"./config/config.env"})

export const app = express()
app.use(Cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/payment",paymentRouter)
app.get("/api/payment/getkey",(req,res)=>res.status(200).json({key:process.env.RAZORPAY_API_KEY}));

app.use("/api",ProductRouter)
app.use(`/${process.env.SECRET_REGISTER_KEY}`,AdminRoutes)


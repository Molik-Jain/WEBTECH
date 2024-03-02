import mongoose from "mongoose";

export const connectDB = async()=>{
    const {connection} = await mongoose.connect(process.env.DATABASE_URI,{
        dbName:"Backend-Ecom"
    })

    console.log(`MongoDB is conneceteed ${connection.host}`)
}
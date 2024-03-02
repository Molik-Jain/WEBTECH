import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  category:{
    type:String,
    required:true,
  },
  brand:{
    type:String,
    required:false,
  },
  color:{
    type:String,
    required:true,
  },
  relevance:{
    type:String,
    required:false,
  },
  size:{
    type:[String],
    required:true,
  },
  image:{
    type:[String],
    required:true,
  }
});

export const Products = mongoose.model("Products", ProductSchema);
import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    id:{
        type:Number,
    },
    title:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    category:{
       type:String
    },
    sold:{
        type:Boolean
    },
    dateOfSale:{
        type:Date
    }
},{timestamps:true})
const Data = mongoose.model("data",userSchema)

export default Data;
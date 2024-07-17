import mongoose from "mongoose";
export const Connectdb =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected successfully : ")

    }catch(error){
        console.log("Error in connecting the databse : ")
    }
}
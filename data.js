// import mongoose from "mongoose";
// import { configDotenv } from "dotenv";
// import Data from "./Modals/DataModals.js";
// import data from "./data.json" assert {type :'json'}
// import { Connectdb } from "./config/connectDB.js";


// export const start = async()=>{
//     try{
//         await Connectdb(process.env.MONGO_URL);
//         await Data.create(data)
//         console.log("success")

//     }catch(error){
//         console.log(error)
//     }
// }

import dotenv from "dotenv"
import data from "./data.json" assert { type: 'json' }
import { Connectdb } from "./config/connectDB.js"
import Data from "./Modals/DataModals.js"

export const start=async()=>{
try{
   await Connectdb(process.env.MONGO_URL);
   await Data.create(data)
   console.log("success")
}catch(error){
    console.log(error)
}
}

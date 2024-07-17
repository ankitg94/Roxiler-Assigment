//import 
import { configDotenv } from "dotenv"
import cors from "cors"
import express from "express"
import { Connectdb } from "./config/connectDB.js"
import DataRoute from "./Route/DataRoute.js"
configDotenv()
//dbconnection
Connectdb()

const app = express() 
//middleware 
app.use(cors())
app.use(express.json())
//route
app.use("/api/v1/data",DataRoute)
//port 
const PORT = process.env.PORT ||8080
//app/listen
app.listen(PORT,()=>{
     console.log(`Server Running at the ${PORT} PORT`)
})
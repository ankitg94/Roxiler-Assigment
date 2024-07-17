//import 
import { configDotenv } from "dotenv"
import cors from "cors"
import express from "express"
import { Connectdb } from "./config/connectDB.js"
import DataRoute from "./Route/DataRoute.js"
configDotenv()
import path from 'path'
import { fileURLToPath } from "url";
//dbconnection
Connectdb()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express() 
//middleware 
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, './client/build')))
//route
app.use("/api/v1/data",DataRoute)

app.use("*",function(req,res){
     res.sendFile(path.join(__dirname,"./client/build/index.html"));
});
//port 
const PORT = process.env.PORT ||8080
//app/listen
app.listen(PORT,()=>{
     console.log(`Server Running at the ${PORT} PORT`)
})

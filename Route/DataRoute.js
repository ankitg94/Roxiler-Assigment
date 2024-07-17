import express from "express"
import { CreateDataController, GetByIDController, GetCategoryController, GetDataController, GetMonthDataController, GetPriceController, SearchDataController } from "../controller/DataController.js"
const route = express.Router()

route.post('/create',CreateDataController)
//geting the data
route.get('/get-data',GetDataController)
route.get('/get-category',GetCategoryController)
route.get('/get-Price',GetPriceController)

//get the month Data
route.get("/get-month-data",GetMonthDataController)

//searching the data
route.get('/search/:keyword',SearchDataController)
//find by particular id

route.get('/searchby/:id',GetByIDController)



export default route

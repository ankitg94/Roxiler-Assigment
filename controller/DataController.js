import Data from "../Modals/DataModals.js"
//create Data

export const CreateDataController = async(req,res)=>{
try{
//reqest from body     
const {id,title, price,description,category,sold,dateOfSale} = req.body
//validation 
if(!id ||!title ||!price ||!description ||!category 
    ||!sold ||!dateOfSale){
     return res.status(404).send({
        success:false,
        mesage:"Please fill all the feilds"
     })
}
//check the id is unique or not 
const uniqueID = await Data.findOne({id})
//validate
if(uniqueID){
    return res.status(500).send({
        success:false,
        mesage:"Id is already available please,try other"
    })
}

//save the data in databse
    const sendData = await new Data({
    id,title, price,description,category,sold,dateOfSale
     }).save()
    //send the request 
    res.status(200).send({
    success:true,
    mesage:"Data created in the dataBase successfully",
    sendData
   })


}catch(error){
   res.status(500).send({
    success:false,
    mesage:"Error in created Data Successfully", 
    error
   })
}
}

//Get all the data
export const GetDataController =async(req,res)=>{
    try{
        //get the data
        const GetData =await Data.find({})
        //send the response to the server
        res.status(200).send({
            length:GetData.length,
            success:true,
            message:"Here is your all Data",
            GetData
        })
    }catch(error){
        res.status(500).send({
            success:false,
            mesage:"Error in getting the all data",
            error
        })


    }
}
//get the Category

export const GetCategoryController=async(req,res)=>{
    try{
        const myData =await Data.find({})
        const CategoryData =await myData.map((item)=>item.category)
        res.status(200).send({
            success:false,
            message:"Get Category Data",
            CategoryData
        }) 

    }catch(error){
        res.status(500).send({
            success:false,
            message:"Error in Get Category data"
        })
    }
}

//Price category
export const GetPriceController = async(req,res)=>{
   try{
      const myData =await Data.find({})
      const PriceCategory =await myData.map((item)=>item.price)
      
      res.status(200).send({
        success:false,
        message:"Price category Getting succesfully",
        PriceCategory
      })

   }catch(error){
        res.status(500).send({
        success:false,
        message:"Error in Get Category data"
    })
    
   }
}

export const SearchDataController = async(req,res)=>{
    try{
        //requesting from params
        const {keyword}=req.params
        //search method
        const result =await Data.find({
            $or:[
                  {title:{$regex:keyword,$options:"i"}},
                  {description:{$regex:keyword,$options:"i"}}        
                ]
        })
        //send the response to the server
        res.status(200).send({
            total:result.length,
            success:true,
            mesage:"Your Search result is here",
            result
        })
    }catch(error){
            res.status(500).send({
            success:false,
            message:"Error in Get search  data"
            })

    }
}

export const GetByIDController =async(req,res)=>{
    try{
        const {id} = req.params
        const result = await Data.findOne({id})
        
        res.status(200).send({
            success:true,
            message:"Your ID Data",
            result
        })


    }catch(error){
            res.status(500).send({
            success:false,
            message:"Error in Get search  data"
            })

    }
}


export const GetMonthDataController =async(req,res)=>{
    try{
     

       const myData =await Data.find({})
       const GetMonthData =await myData.map((item)=>item.dateOfSale)
       const GetPArticularMonth=await GetMonthData.map((item)=>item.getMonth())
            //count the occurence of each year
             res.status(200).send({
            success:true,
            message:"Your api Data result",
            GetPArticularMonth
            })
            }catch(error){
            res.status(500).send({
            success:false,
            message:"Error in Get Month  data",
            error
         })


    }
}
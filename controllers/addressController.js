const {address}=require("../models/address")

const addaddress=async(req,res)=>{
   try {
    const data= await address.create(req.body)
    if(!data){
        return res.status(400).json({message:"address not found"})
    }
    res.status(200).json({message:"address found",data})
    
   } catch (error) {
    res.status(500).json({message:"error occured"})
   }
}

module.exports={addaddress}
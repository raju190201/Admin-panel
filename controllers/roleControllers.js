const {role}=require("../models/index")

const addrole=async (req,res)=>{
        try {
      const data =  await role.create(req.body)
            if(data){
                return res.status(200).json({message:"Role added successfully",data:data})
            }
                res.status(400).json({message:"Error"})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
}

module.exports={addrole}
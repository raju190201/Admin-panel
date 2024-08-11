const {user}=require('../models/index');

const register = async(req,res)=>{
    try{
        // const {password, ...rest} = req.body;
        // console.log(req.raju);
        // const hashedPassword = await bcrypt.hash(password, 10);

        const data= await user.create(req.body)
        if(!data){
          return res.status(400).json({message:"unable to register new user"})
        }
        
        return res.status(200).json({message:"user register successfuly",data:data})
        
    }catch(error){
        console.error(error);
        res.status(400).json({message:"error o occured",error:error})
    }
}

const login= async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json(
                {
                    status: false,
                    flag: "INVALID CREDENTIAL",
                    message:"Email and password required"
                }
            )
        }

        const user = await db.user.findOne({
            where:{
                email:email
            }
        })

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                status:false,
                flag:"INVALID CREDENTIAL",
                message:"Incorrect password"
            })
        }

        delete user.dataValues['password'];
        res.status(200).json({
            status:true,
            flag: "SUCCESS",
            message:"user login successfully",
            data:user
        })


    } catch (error) {
        
    }
}





module.exports={
    register, login
}
const db=require('../models/index');
const bcrypt = require("bcrypt");
const register = async(req,res)=>{
    try{
        const {password, ...rest} = req.body;
        console.log(req.raju);
        const hashedPassword = await bcrypt.hash(password, 10);

        const data= await db.User.create({password:hashedPassword,...rest})
        if(!data){
          return res.status(400).json({message:"unable to register new user"})
        }
        
        return res.status(200).json({message:"user register successfuly",data:data})
        
    }catch(error){
        console.error(error);
        res.status(400).json({message:"error o occured",error:error})
    }
}

const getUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await db.user.findOne({
            where:{
                id:id
            }
        });

        if(!data){
           return res.status(400).json({message:`unable to find user with id ${id}`})
        }

        res.status(200).json({message:"here is the user detail", data:data})
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"Error occured while finding user with given id",error:error})
    }
}

const userList = async(req,res)=>{

    try {

        const {id}=req.pharm;
        const data = await db.user.findAll({});

        if(data.length==0){
           return res.status(400).json({message:`unable to find user listing`})
        }

        res.status(200).json({message:"here is the users list", data:data})
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"Error occured while finding users",error:error})
    }
}

const updateUser = async(req,res)=>{
    try {
        const {id} = req.params;

        const data = await db.user.update(req.body,{
            where:{
                id:id
            }
        })
        if(!data[0] >= 1){
            res.status(400).json({message:"unable to update user"});
        }

        res.status(200).json({message:"user updated successfully", data:data})
    } catch (error) {
        res.status(400).json({message:"error occured", error:error});
    }
}

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const data= await db.User.destroy({
            where:{
                id:id
            },
            returning:true
        });

        if(data == 0){
            return res.status(400).json({message:"unable to delete user"})
        }


        res.status(200).json({message:"user deleted successfully",data:data});
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"error occured while deleting user"});
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
    register,getUser, userList, updateUser, deleteUser, login
}
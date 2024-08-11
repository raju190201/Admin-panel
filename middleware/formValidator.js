const db = require("../models/index")

const validateuser = async(req,res,next)=>{
    const {email} = req.body;

    const data = await db.User.findOne({
        where:{
            email:email
        },
    })

    if(data){
       return res.status(400).json({status:false, flag:"FAILED", message:"User exists with given email"})
    }
    console.log("hello");

    next('route');
}

const userExist = async(req,res,next)=>{

    const id = Number(req.params.id);
    console.log(id,"id");
    console.log(isNaN(id), "nan");
    if(isNaN(id)){
        return res.status(400).json({message:"please enter a valid user id"})
    }

    const data = await db.User.findOne({
        where:{
            id:id
        }
    })

    if(!data){
        return res.status(400).json({status:false, flag:"NOT FOUND", message:"No user exists with given user id"})
    }

    next();
}


const trim = (req,res,next)=>{
for(let val in req.body){
    req.body[val] = req.body[val].trim();
    // console.log(req.body[val],"  ",val);
}
console.log("hello");

  next();
}
const userfirstname = async(req,res,next)=>{
const {firstName}=req.body
 const fname=await db.User.findOne({
    where:{
        firstName:firstName

    },
})

if(fname){
    return res.status(400).json({status:false,flag:"failed",message:"user name already exists"})
}
console.log("hello");

next();
}

module.exports = {
    validateuser, userExist, trim,userfirstname
}
const express=require('express')

const router=express.Router()
const{addrole}=require("../controllers/roleControllers")

router.post('/create_role',addrole)


module.exports=router
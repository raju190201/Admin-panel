const express=require('express')

const router=express.Router()

const{addaddress}=require("../controllers/addressController")

router.post("/create_address",addaddress)

module.exports=router
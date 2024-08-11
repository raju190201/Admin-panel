const express=require('express');

const router=express.Router();


const {register,getUser,userList,updateUser,deleteUser, login}=require('../controllers/usercreate')
//importing middleware
const {validateuser, userExist, trim ,userfirstname} = require("../middleware/formValidator")

router.post('/register_user',[validateuser, trim,userfirstname], register);
router.get('/get_user/:id',getUser);
router.get("/user_listing",userList);
router.patch("/update_user/:id",updateUser);
router.delete('/delete_user/:id',userExist, deleteUser);
router.post("/login",login);



module.exports=router;

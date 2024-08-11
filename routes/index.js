const express = require('express');
const router = express.Router();

const userRoute = require('./userRoutes');
const roleRoute=require('./roleroutes');
const addressRoute=require('./addressRoutes');
const authRoute=require("./authRoutes");

router.use('/role',roleRoute);
router.use('/user', userRoute);
router.use('/address',addressRoute);
router.use("/auth",authRoute);


module.exports = router;
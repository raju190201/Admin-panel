const express=require('express');
const app=express();
const port= 8000;
const indexRouter = require('./routes/index');

app.use(express.urlencoded({extended:true}));
app.use('/',indexRouter);

app.listen(port,()=>{
    console.log("app is running on port localhost ",port)
})
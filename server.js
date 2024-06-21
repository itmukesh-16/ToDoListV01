// express 
const express= require("express")
const app=express()
const cors=require("cors")
const port=process.env.PORT||3000;

const mognoose=require("mongoose");
const loginTable = require("./models/login.model.js");
const conStr="mongodb+srv://itsmukeshgouda:db1MukeshPass@todolistv10.yld3slp.mongodb.net/?retryWrites=true&w=majority&appName=ToDoListV10";

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// middleware 
app.use(express.json());
app.use(cors());


// inserting data into database through post method for adding new user
app.post('/newRegister',async (req,res) =>{
    try{
        const addDataToTable = new loginTable({ userid: req.body.userid , password:req.body.password });
        await addDataToTable.save();
        res.status(200).json(addDataToTable);
    }
    catch{
        res.status(500).json({message: error.message})
    }
})

// for fetching user data to check wheather the new user exist or not
app.get('/fetchExistingUserData', async (req,res)=>{

    try{
            const tableData=await loginTable.find({});

            res.status(200).json(tableData);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})


mognoose.connect(conStr).then(()=>{

    app.listen(port,()=>{
        console.log(`server started at port ${port}`);
        console.log("database connected.....");
    })
}).catch(()=>{
    console.log("connection failed")
})
const mongoose=require("mongoose")

const loginSchema = mongoose.Schema(
    {
        userid:{
            type:String,
            reqired:true,
            default:0
        },
        password:{
            type:Number,
            reqired:true,
            default:0
        },
        userData:{
            type:String
        }
    },
    {
        timestapms:true
    }
)

const loginTable=mongoose.model("loginTable",loginSchema);

module.exports=loginTable;
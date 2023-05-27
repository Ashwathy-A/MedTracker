const mongoose=require('mongoose')

const medication=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    fromdate:{
        type:Date,
        required:true
    }
})
const Medicinemodel=mongoose.model("medicine",medication)
module.exports=Medicinemodel
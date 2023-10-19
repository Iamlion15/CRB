const mongoose=require('mongoose')

 const CrbStatusSchema=new mongoose.Schema({
       loanId:{
        type:String,
        required:true
       },
       status:{
        type:String,
        required:true
       }
 })



 const CrbModel=mongoose.model('CRBStatus',CrbStatusSchema)


 module.exports=CrbModel;
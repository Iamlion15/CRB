const CrbModel=require("../model/crbStatusModel")

exports.SaveStatus=async(req,res)=>{
    const data=new CrbModel(req.body)
    try {
        await data.save();
        res.status(200).json({message:"saved "})
    } catch (err) {
        res.status(400).json({error:err})
    }
}

exports.readErrorStatus=async(req,res)=>{
    try {
        const errorReport=CrbModel.find({status:"failed"})
        res.status(200).json(errorReport)
    } catch (err) {
        res.status(400).json({error:err})
    }
}

exports.readSuccessStatus=async(req,res)=>{
    try {
        const errorReport=CrbModel.find({status:"success"})
        res.status(200).json(errorReport)
    } catch (err) {
        res.status(400).json({error:err})
    }
}
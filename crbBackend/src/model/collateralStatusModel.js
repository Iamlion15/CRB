const mongoose = require('mongoose')

const CollateralStatusSchema = new mongoose.Schema({
      collateralId:{
            type: String,
            required: true
      },
      loanId: {
            type: String,
            required: true
      },
      status: {
            type: String,
            required: true
      },
      errorData:{
            errorMessage:String,
            fieldName:String,
            fieldValue:String
      }
},{timestamps:true})

CollateralStatusSchema.index({ createdAt: 1 }, { expireAfterSeconds: 240 });


const CrbModel = mongoose.model('CollateralStatus', CollateralStatusSchema)


module.exports = CrbModel;
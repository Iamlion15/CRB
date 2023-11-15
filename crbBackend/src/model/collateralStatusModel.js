const mongoose = require('mongoose')

const CollateralStatusSchema = new mongoose.Schema({
      collateralId:{
            type: String,
            required: true
      },
      accountNumber: {
            type: String,
            required: true
      },
      status: {
            type: String,
            required: true
      },
      errorInformationMessage:{
            type:String,
            default:"Failed validation, record has validation errors"
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
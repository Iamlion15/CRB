const mongoose = require('mongoose')

const CorporateStatusSchema = new mongoose.Schema({
      accountNumber: {
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

CorporateStatusSchema.index({ createdAt: 1 }, { expireAfterSeconds: 240 });


const CorporateModal = mongoose.model('corporateStatus', CorporateStatusSchema)


module.exports = CorporateModal;
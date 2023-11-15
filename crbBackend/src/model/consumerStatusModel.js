const mongoose = require('mongoose')

const ConsumerStatusSchema = new mongoose.Schema({

      accountNumber: {
            type: String,
            required: true
      },
      status: {
            type: String,
            required: true
      },
      errorData: [{
            errorMessage: String,
            fieldName: String,
            fieldValue: String
      }]
}, { timestamps: true })

ConsumerStatusSchema.index({ createdAt: 1 }, { expireAfterSeconds: 240 });


const ConsumerModal = mongoose.model('ConsumerStatuses', ConsumerStatusSchema)


module.exports = ConsumerModal;
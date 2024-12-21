import mongoose from 'mongoose'

const bankDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    accountNumber: {
      type: String
    },
    location: {
      type: String
    },
    routingNumber: {
      type: String
    }
  },
  { timestamps: true }
)

export default mongoose.models.bankDetails ||
  mongoose.model('bankDetails', bankDetailsSchema)

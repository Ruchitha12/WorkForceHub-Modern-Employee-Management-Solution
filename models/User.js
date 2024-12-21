import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, unique: true },
    hash: { type: String },
    salt: { type: String },
    category: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    gender: {
      type: String
    },
    hiredDate: {
      type: Date
    },
    phone: {
      type: String
    },
    designation: {
      type: String
    },
    bankId: {
      type: String
    },
    departmentId: {
      type: String
    }
  },
  { timestamps: true }
)

export default mongoose.models.users || mongoose.model('users', userSchema)

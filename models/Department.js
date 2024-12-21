import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    manager: {
      type: String
    }
  },
  { timestamps: true }
)

const DepartmentModel =
  mongoose.models.departments || mongoose.model('departments', departmentSchema)

export default DepartmentModel

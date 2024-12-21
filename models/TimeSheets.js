import mongoose from 'mongoose'

const timesheetSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    date: {
      type: Date
    },
    hoursWorked: {
      type: String
    }
  },
  { timestamps: true }
)

const TimeSheetModel =
  mongoose.models.timesheets || mongoose.model('timesheets', timesheetSchema)

export default TimeSheetModel

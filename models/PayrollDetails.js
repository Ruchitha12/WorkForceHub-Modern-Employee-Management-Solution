import mongoose from 'mongoose'

const payrollSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    payDate: {
      type: Date
    },
    basePay: {
      type: String
    },
    variablePay: {
      type: String
    },
    taxAmount: {
      type: String
    },
    totalSalary: {
      type: String
    }
  },
  { timestamps: true }
)

const PayrollModel =
  mongoose.models.payrolls || mongoose.model('payrolls', payrollSchema)

export default PayrollModel

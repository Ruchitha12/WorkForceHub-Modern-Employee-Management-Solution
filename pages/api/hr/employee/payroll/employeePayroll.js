import connectDB from '../../../../../src/lib/connectDB.js'
import Payroll from '../../../../../models/PayrollDetails.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchPayrollDetails(req, res)
      break
    case 'PUT':
      await editPayrollDetails(req, res)
      break
  }
}

const searchPayrollDetails = async (req, res) => {
  try {
    await connectDB()
    const { userId } = req.query

    const details = await Payroll.findOne({ user: userId })

    if (details) {
      return res.status(200).json({ message: 'Details Found', details })
    } else {
      return res
        .status(404)
        .json({ message: 'Details not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const editPayrollDetails = async (req, res) => {
  try {
    await connectDB()

    const payrollDetail = await Payroll.findByIdAndUpdate(
      req.body._id,
      req.body
    )
    if (payrollDetail) {
      return res.status(200).json({ message: 'Payroll Updated', payrollDetail })
    } else {
      return res.status(500).json({ message: 'Please try again!' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

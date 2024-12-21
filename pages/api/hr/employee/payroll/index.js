import connectDB from '../../../../../src/lib/connectDB.js'
import Payroll from '../../../../../models/PayrollDetails.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchAllPayrolls(req, res)
      break
    case 'POST':
      await createPayroll(req, res)
      break
  }
}

const createPayroll = async (req, res) => {
  try {
    await connectDB()

    const { user, payDate, basePay, variablePay, taxAmount, totalSalary } =
      req.body

    const createPayroll = new Payroll({
      user,
      payDate,
      basePay,
      variablePay,
      taxAmount,
      totalSalary
    })

    const response = await createPayroll.save()

    return res.status(200).json({
      message: 'Success! Payroll Created',
      payroll: response
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const searchAllPayrolls = async (req, res) => {
  try {
    await connectDB()
    const details = await Payroll.find({}).sort({ $natural: -1 })

    if (details.length > 0) {
      return res.status(200).json({ message: 'Payroll Details Found', details })
    } else {
      return res
        .status(404)
        .json({ message: 'Payroll Details not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

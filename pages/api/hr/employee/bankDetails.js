import connectDB from '../../../../src/lib/connectDB.js'
import BankDetails from '../../../../models/BankDetails.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchEmployeeBankDetails(req, res)
      break
    case 'POST':
      await createEmployeeBankDetails(req, res)
      break
  }
}

const searchEmployeeBankDetails = async (req, res) => {
  try {
    await connectDB()
    const { userId } = req.query

    const details = await BankDetails.findById(userId)

    if (details) {
      return res.status(200).json({ message: 'Bank Details Found', details })
    } else {
      return res
        .status(200)
        .json({ message: 'Details not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createEmployeeBankDetails = async (req, res) => {
  try {
    await connectDB()

    const { name, accountNumber, location, routingNumber } = req.body

    const createdBankDetails = new BankDetails({
      name,
      accountNumber,
      location,
      routingNumber
    })

    const response = await createdBankDetails.save()

    return res.status(200).json({
      message: 'Success! Bank Details Created',
      bankDetails: response
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

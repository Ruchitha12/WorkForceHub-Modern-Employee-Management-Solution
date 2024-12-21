import connectDB from '../../../../src/lib/connectDB.js'
import User from '../../../../models/User.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchEmployeeDetails(req, res)
      break
    case 'PUT':
      await editEmployeeDetails(req, res)
      break
    case 'DELETE':
      await deleteEmployeeDetails(req, res)
      break
  }
}

const searchEmployeeDetails = async (req, res) => {
  try {
    await connectDB()
    const { userId } = req.query

    const details = await User.findById(userId)

    if (details) {
      return res.status(200).json({ message: 'Details Found', details })
    } else {
      return res
        .status(200)
        .json({ message: 'Details not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const editEmployeeDetails = async (req, res) => {
  try {
    await connectDB()

    const employeeDetail = await User.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    )
    if (employeeDetail) {
      return res
        .status(200)
        .json({ message: 'Employee Details Updated', employeeDetail })
    } else {
      return res.status(500).json({ message: 'Please try again!' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteEmployeeDetails = async (req, res) => {
  try {
    await connectDB()
    const employee = await User.findByIdAndDelete(req.query.id)
    if (employee) {
      return res.status(200).json({ message: 'Employee Removed', employee })
    } else {
      return res.status(200).json({ message: 'Please try again!' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

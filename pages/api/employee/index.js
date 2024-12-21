import connectDB from '../../../src/lib/connectDB.js'
import User from '../../../models/User.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchAllEmployeeDetails(req, res)
      break
    case 'POST':
      await createEmployeeDetails(req, res)
      break
    case 'PUT':
      await updateEmployeeDetails(req, res)
      break
  }
}

const createEmployeeDetails = async (req, res) => {
  try {
    await connectDB()

    const { name, email, manager } = req.body

    const createdDepartment = new Department({
      name,
      email,
      manager
    })

    const response = await createdDepartment.save()

    return res.status(200).json({
      message: 'Success! Department Created',
      department: response
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const searchAllEmployeeDetails = async (req, res) => {
  try {
    await connectDB()
    const details = await User.find({}).sort({ $natural: -1 })

    if (details.length > 0) {
      return res
        .status(200)
        .json({ message: 'Employee Details Found', details })
    } else {
      return res
        .status(404)
        .json({ message: 'Employee Details not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateEmployeeDetails = async (req, res) => {
  try {
    await connectDB()

    const { name, email, manager } = req.body

    const createdDepartment = new Department({
      name,
      email,
      manager
    })

    const response = await createdDepartment.save()

    return res.status(200).json({
      message: 'Success! Department Created',
      department: response
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

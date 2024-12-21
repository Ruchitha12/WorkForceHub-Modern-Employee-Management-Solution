import connectDB from '../../../src/lib/connectDB.js'
import Department from '../../../models/Department.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchAllDepartments(req, res)
      break
    case 'POST':
      await addDepartment(req, res)
      break
  }
}

const addDepartment = async (req, res) => {
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

const searchAllDepartments = async (req, res) => {
  try {
    await connectDB()
    const details = await Department.find({}).sort({ $natural: -1 })

    if (details.length > 0) {
      return res
        .status(200)
        .json({ message: 'Department Details Found', details })
    } else {
      return res
        .status(200)
        .json({ message: 'Department Details not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

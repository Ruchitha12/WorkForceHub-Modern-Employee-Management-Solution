import connectDB from '../../../../../src/lib/connectDB.js'
import TimeSheet from '../../../../../models/TimeSheets.js'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      await searchAllTimeStamps(req, res)
      break
    case 'POST':
      await createTimeStamp(req, res)
      break
  }
}

const createTimeStamp = async (req, res) => {
  try {
    await connectDB()

    const { user, date, hoursWorked } = req.body

    const createTimeStamp = new TimeSheet({
      user,
      date,
      hoursWorked
    })

    const response = await createTimeStamp.save()

    return res.status(200).json({
      message: 'Success! TimeStamps Created',
      timestamp: response
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const searchAllTimeStamps = async (req, res) => {
  try {
    await connectDB()
    const details = await TimeSheet.find({}).sort({ $natural: -1 })

    if (details.length > 0) {
      return res.status(200).json({ message: 'TimeStamps Found', details })
    } else {
      return res
        .status(404)
        .json({ message: 'TimeStamps not found', details: undefined })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

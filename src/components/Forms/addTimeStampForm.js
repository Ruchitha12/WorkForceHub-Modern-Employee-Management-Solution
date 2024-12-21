import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useModalContext } from '../../context/ModalContext'
import axios from 'axios'
import { DropDown } from '../Reusables/Dropdown'
import { useAllEmployeeHook } from '../../hooks/useAllEmployeeDetails'
import { useUser } from '../../lib/hooks'

export const AddTimestampForm = () => {
  const { setIsOpen } = useModalContext()
  const user = useUser()
  const { employee, isLoading, isError } = useAllEmployeeHook()
  const [selectedUser, setSelectedUser] = useState(employee && employee[0])

  const [formDetails, setFormDetails] = useState({
    user: user?.category === 'hr' ? selectedUser?._id : user?._id,
    date: '',
    hoursWorked: ''
  })

  const onSubmitHandler = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/hr/employee/timestamps`,
        {
          user: formDetails?.user,
          date: formDetails?.date,
          hoursWorked: formDetails?.hoursWorked
        }
      )
      const { message } = response.data
      if (message === 'Success! TimeStamps Created') {
        toast.success(message, { toastId: message })
      } else {
        toast.error(message, { toastId: message })
      }
      mutate('/api/hr/employee/timestamps')
      setIsOpen(false)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    setSelectedUser(employee[0])
  }, [employee])

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Add TimeStamp
      </h2>
      <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-6 relative -top-[22px]'>
          {!isLoading && user?.category == 'hr' && (
            <DropDown
              title={'Employee Email'}
              options={employee && employee}
              isEmail={true}
              selectedOption={selectedUser}
              setSelectedOption={setSelectedUser}
            />
          )}
        </div>
        <div className='sm:col-span-3'>
          <label
            htmlFor='date'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Date
          </label>
          <div className='mt-2'>
            <input
              type='date'
              name='date'
              id='date'
              value={formDetails?.date?.substring(0, 10)}
              onChange={e =>
                setFormDetails({ ...formDetails, date: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='hoursWorked'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Hours Worked
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='hoursWorked'
              id='hoursWorked'
              value={formDetails?.hoursWorked}
              onChange={e =>
                setFormDetails({ ...formDetails, hoursWorked: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          onClick={() => setIsOpen(false)}
          type='button'
          className='text-sm font-semibold leading-6 text-gray-900'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Save
        </button>
      </div>
    </form>
  )
}

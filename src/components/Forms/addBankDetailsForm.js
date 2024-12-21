import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useModalContext } from '../../context/ModalContext'
import axios from 'axios'
import { useEmployeeHook } from '../../hooks/useEmployeeHook'

export const AddBankDetailsForm = () => {
  const { setIsOpen, editId } = useModalContext()
  const { employee } = useEmployeeHook(editId)
  const [formDetails, setFormDetails] = useState({
    name: '',
    accountNumber: '',
    location: '',
    routingNumber: ''
  })

  const onSubmitHandler = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/hr/employee/bankDetails`,
        {
          name: formDetails?.name,
          accountNumber: formDetails?.accountNumber,
          location: formDetails?.location,
          routingNumber: formDetails?.routingNumber
        }
      )

      const editedResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/hr/employee/employeeDetails`,
        {
          ...employee,
          bankId: response?.data?.bankDetails?._id
        }
      )
      const { message: editedMessage } = editedResponse.data

      const { message } = response.data
      if (
        message === 'Success! Department Created' &&
        editedMessage === 'Employee Details Updated'
      ) {
        toast.success(message, { toastId: message })
      } else {
        toast.error(message, { toastId: message })
      }
      mutate('/api/hr/employee')
      setIsOpen(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Add Bank Details
      </h2>
      <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-3'>
          <label
            htmlFor='bankName'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Bank name
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='bankName'
              id='bankName'
              value={formDetails?.name}
              onChange={e =>
                setFormDetails({ ...formDetails, name: e.target.value })
              }
              className='px-2 block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='accountNumber'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Account Number
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='accountNumber'
              id='accountNumber'
              value={formDetails?.accountNumber}
              onChange={e =>
                setFormDetails({
                  ...formDetails,
                  accountNumber: e.target.value
                })
              }
              className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='location'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Bank Location
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='location'
              id='location'
              value={formDetails?.location}
              onChange={e =>
                setFormDetails({ ...formDetails, location: e.target.value })
              }
              className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='routing'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Routing Number
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='routing'
              id='routing'
              value={formDetails?.routingNumber}
              onChange={e =>
                setFormDetails({
                  ...formDetails,
                  routingNumber: e.target.value
                })
              }
              className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          onClick={() => setIsOpen(false)}
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

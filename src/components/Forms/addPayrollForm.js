import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useModalContext } from '../../context/ModalContext'
import axios from 'axios'
import { DropDown } from '../Reusables/Dropdown'
import { useAllEmployeeHook } from '../../hooks/useAllEmployeeDetails'

export const AddPayrollForm = () => {
  const { setIsOpen } = useModalContext()
  const { employee, isLoading, isError } = useAllEmployeeHook()
  const [selectedUser, setSelectedUser] = useState(employee && employee[0])

  const [formDetails, setFormDetails] = useState({
    user: selectedUser?._id,
    payDate: '',
    basePay: '',
    variablePay: '',
    taxAmount: '',
    totalSalary: ''
  })

  const onSubmitHandler = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/hr/employee/payroll`,
        {
          user: selectedUser?._id,
          payDate: formDetails?.payDate,
          basePay: formDetails?.taxAmount,
          variablePay: formDetails?.variablePay,
          taxAmount: formDetails?.taxAmount,
          totalSalary: formDetails?.totalSalary
        }
      )
      const { message } = response.data
      if (message === 'Success! Payroll Created') {
        toast.success(message, { toastId: message })
      } else {
        toast.error(message, { toastId: message })
      }
      mutate('/api/hr/employee/payroll')
      setIsOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setFormDetails({
      ...formDetails,
      user: selectedUser?._id
    })
  }, [selectedUser, employee])

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Add Payroll
      </h2>
      <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-3 relative -top-[22px]'>
          {!isLoading && (
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
            Pay Date
          </label>
          <div className='mt-2'>
            <input
              type='date'
              name='date'
              id='date'
              value={formDetails?.payDate?.substring(0, 10)}
              onChange={e =>
                setFormDetails({ ...formDetails, payDate: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='basePay'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Base Pay
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='basePay'
              id='basePay'
              value={formDetails?.basePay}
              onChange={e =>
                setFormDetails({ ...formDetails, basePay: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='variablePay'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Variable Pay
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='variablePay'
              id='variablePay'
              value={formDetails?.variablePay}
              onChange={e =>
                setFormDetails({ ...formDetails, variablePay: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div className='sm:col-span-3'>
          <label
            htmlFor='taxAmount'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Tax Amount
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='taxAmount'
              id='taxAmount'
              value={formDetails?.taxAmount}
              onChange={e =>
                setFormDetails({ ...formDetails, taxAmount: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='totalSalary'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Total Salary
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='totalSalary'
              id='totalSalary'
              value={formDetails?.totalSalary}
              onChange={e =>
                setFormDetails({ ...formDetails, totalSalary: e.target.value })
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

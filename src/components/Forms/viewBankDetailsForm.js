import React, { useState } from 'react'
import { useModalContext } from '../../context/ModalContext'
import { useBankDetailsHook } from '../../hooks/useBankDetailsHook'

export const ViewBankDetailsForm = () => {
  const { editId } = useModalContext()
  const { bankDetails } = useBankDetailsHook(editId)
  const [formDetails, setFormDetails] = useState({
    name: bankDetails?.name,
    accountNumber: bankDetails?.accountNumber,
    location: bankDetails?.location,
    routingNumber: bankDetails?.routingNumber
  })

  return (
    <div>
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
              disabled
              value={formDetails?.name}
              onChange={e =>
                setFormDetails({ ...formDetails, name: e.target.value })
              }
              className='px-2 block w-full cursor-not-allowed px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
              disabled
              value={formDetails?.accountNumber}
              onChange={e =>
                setFormDetails({
                  ...formDetails,
                  accountNumber: e.target.value
                })
              }
              className='block w-full cursor-not-allowed px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
              disabled
              value={formDetails?.location}
              onChange={e =>
                setFormDetails({ ...formDetails, location: e.target.value })
              }
              className='block w-full cursor-not-allowed px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
              disabled
              id='routing'
              value={formDetails?.routingNumber}
              onChange={e =>
                setFormDetails({
                  ...formDetails,
                  routingNumber: e.target.value
                })
              }
              className='block w-full cursor-not-allowed px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

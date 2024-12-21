import React from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useModalContext } from '../../context/ModalContext'
import axios from 'axios'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'

export const DeleteEmployeeForm = () => {
  const { setIsOpen, editId } = useModalContext()

  const onSubmitHandler = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.delete(
        `/api/hr/employee/employeeDetails?id=${editId}`
      )
      if (data.message === 'Employee Removed') {
        await mutate(`/api/hr/employee`)
        toast.success(data.message, {
          toastId: data.message
        })
        setIsOpen(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='mt-2'>
      <div className='sm:flex sm:items-start'>
        <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
          <ExclamationTriangleIcon
            className='h-6 w-6 text-red-600'
            aria-hidden='true'
          />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'
          >
            Delete Employee
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              Are you sure you want to delete employee account? All of the data
              will be permanently removed from our database forever. This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
          onClick={onSubmitHandler}
        >
          Delete
        </button>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

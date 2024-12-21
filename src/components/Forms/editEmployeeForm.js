import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useModalContext } from '../../context/ModalContext'
import axios from 'axios'
import { useEmployeeHook } from '../../hooks/useEmployeeHook'
import { DropDown } from '../Reusables/Dropdown'

export const EditEmployeeForm = () => {
  const { setIsOpen, editId, formData } = useModalContext()
  const { employee, isLoading, isError } = useEmployeeHook(editId)
  const [selectedDesignation, setSelectedDesignation] = useState(
    formData?.filter(x => x.id == employee?.departmentId)[0]
  )

  const [formDetails, setFormDetails] = useState({
    firstName: employee?.firstName,
    lastName: employee?.lastName,
    email: employee?.email,
    gender: employee?.gender,
    hiredDate: employee?.hiredDate,
    phone: employee?.phone,
    designation: employee?.designation,
    departmentId: selectedDesignation?.id
  })

  const onSubmitHandler = async e => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/hr/employee/employeeDetails`,
        {
          ...employee,
          firstName: formDetails?.firstName,
          lastName: formDetails?.lastName,
          email: formDetails?.email,
          gender: formDetails?.gender,
          hiredDate: formDetails?.hiredDate,
          phone: formDetails?.phone,
          designation: formDetails?.designation,
          departmentId: selectedDesignation?.id
        }
      )
      const { message } = response.data
      if (message === 'Employee Details Updated') {
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

  useEffect(() => {
    setFormDetails({
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      email: employee?.email,
      gender: employee?.gender,
      hiredDate: employee?.hiredDate,
      phone: employee?.phone,
      designation: employee?.designation,
      departmentId: selectedDesignation?.id
    })
  }, [selectedDesignation, employee])

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Edit Employee
      </h2>
      <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-2'>
          <label
            htmlFor='first-name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            First Name
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='first-name'
              id='first-name'
              value={formDetails?.firstName}
              onChange={e =>
                setFormDetails({ ...formDetails, firstName: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='last-name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Last name
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='last-name'
              id='last-name'
              value={formDetails?.lastName}
              onChange={e =>
                setFormDetails({ ...formDetails, lastName: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='dept-email'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Email
          </label>
          <div className='mt-2'>
            <input
              type='email'
              name='dept-email'
              id='dept-email'
              value={formDetails?.email}
              onChange={e =>
                setFormDetails({ ...formDetails, email: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='gender'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Gender
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='gender'
              id='gender'
              value={formDetails?.gender}
              onChange={e =>
                setFormDetails({ ...formDetails, gender: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='phone'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Phone
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='phone'
              id='phone'
              value={formDetails?.phone}
              onChange={e =>
                setFormDetails({ ...formDetails, phone: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='hiredDate'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Hired Date
          </label>
          <div className='mt-2'>
            <input
              type='date'
              name='hiredDate'
              id='hiredDate'
              value={formDetails?.hiredDate?.substring(0, 10)}
              onChange={e =>
                setFormDetails({ ...formDetails, hiredDate: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3'>
          <label
            htmlFor='design'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Designation
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='design'
              id='design'
              value={formDetails?.designation}
              onChange={e =>
                setFormDetails({ ...formDetails, designation: e.target.value })
              }
              className='px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-3 relative -top-[22px]'>
          <DropDown
            title={'Department'}
            options={formData}
            selectedOption={selectedDesignation}
            setSelectedOption={setSelectedDesignation}
          />
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

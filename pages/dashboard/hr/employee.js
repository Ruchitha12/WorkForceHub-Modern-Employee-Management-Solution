import React from 'react'
import { getLoginSession } from '../../../src/lib/auth'
import { findUser } from '../../../src/lib/user'
import { useModalContext } from '../../../src/context/ModalContext'
import {
  EyeIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useAllEmployeeHook } from '../../../src/hooks/useAllEmployeeDetails'
import { EmptyState } from '../../../src/components/Reusables/EmptyState'
import { useDepartmentDetails } from '../../../src/hooks/useDepartmentDetails'
import { Loading } from '../../../src/components/Reusables/Loading'

const HREmployee = () => {
  const { employee, isLoading, isError } = useAllEmployeeHook()
  const { department } = useDepartmentDetails()
  const { setIsOpen, setForm, setEditId, setFormData } = useModalContext()

  const handleClickHandler = () => {
    setIsOpen(true)
    setForm('addEmployeeForm')
    setFormData(department)
  }

  const handleAddBankDetails = id => {
    setIsOpen(true)
    setForm('addBankDetailsForm')
    setEditId(id)
  }

  const handleViewBankDetails = id => {
    setIsOpen(true)
    setForm('viewBankDetailsForm')
    setEditId(id)
  }

  const handleDeleteEmp = id => {
    setIsOpen(true)
    setForm('deleteEmployeeForm')
    setEditId(id)
  }

  const handleEditEmp = id => {
    setIsOpen(true)
    setForm('editEmployeeForm')
    setFormData(department)
    setEditId(id)
  }

  if (isLoading) return <Loading />

  return (
    <div className='px-4 sm:px-6 lg:px-8 mt-[15vh]'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold leading-6 text-gray-900'>
            Employee
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the employees in the company including their bank
            details.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            onClick={handleClickHandler}
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add Employee
          </button>
        </div>
      </div>
      <div className='mt-8'>
        <div className='mt-2 flex flex-col'>
          <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                      >
                        Employee Id
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        First Name
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Last Name
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Gender
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Hired Date
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Phone
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Designation
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Bank Details
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {employee?.length > 0 && (
                    <tbody className='bg-white'>
                      {employee?.map((emp, empIdx) => (
                        <tr
                          key={emp._id}
                          className={
                            empIdx % 2 === 0 ? undefined : 'bg-gray-50'
                          }
                        >
                          <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                            {emp?._id}
                          </td>
                          <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                            {emp?.email}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {emp?.firstName ? emp?.firstName : '-'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {emp?.lastName ? emp?.lastName : '-'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {emp?.gender ? emp?.gender : '-'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {emp?.hiredDate
                              ? emp?.hiredDate?.substring(0, 10)
                              : '-'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {emp?.phone ? emp?.phone : '-'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {emp?.designation ? emp?.designation : '-'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex items-center'>
                            {!emp?.bankId ? (
                              <button
                                onClick={() => handleAddBankDetails(emp?._id)}
                                className='whitespace-nowrap px-2 text-sm'
                              >
                                <PlusCircleIcon className='w-6 h-6 text-blue-600 hover:text-blue-400' />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleViewBankDetails(emp?.bankId)
                                }
                                className='whitespace-nowrap px-2 text-sm'
                              >
                                <EyeIcon className='w-6 h-6 text-gray-600 hover:text-gray-400' />
                              </button>
                            )}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 '>
                            <button
                              onClick={() => handleDeleteEmp(emp?._id)}
                              className='whitespace-nowrap px-2 text-sm'
                            >
                              <TrashIcon className='w-6 h-6 text-red-600 hover:text-red-400' />
                            </button>
                            <button
                              onClick={() => handleEditEmp(emp?._id)}
                              className='whitespace-nowrap px-2 text-sm'
                            >
                              <PencilIcon className='w-6 h-6 text-green-600 hover:text-green-400' />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!employee && (
        <>
          <EmptyState
            heading={'Employee not found.'}
            description={'There are no employee to find in your company.'}
            image={`/no_results.png`}
          />
        </>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getLoginSession(req)
  const user = (session?._doc && (await findUser(session._doc))) ?? null
  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  if (user.category !== 'hr') {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default HREmployee

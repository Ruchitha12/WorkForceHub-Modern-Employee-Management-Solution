import React from 'react'
import { getLoginSession } from '../../../src/lib/auth'
import { findUser } from '../../../src/lib/user'
import { useEmployeeHook } from '../../../src/hooks/useEmployeeHook'
import { Loading } from '../../../src/components/Reusables/Loading'

const EmployeeDashboard = ({ session }) => {
  const { employee, isLoading } = useEmployeeHook(session?._doc?._id)

  if (isLoading) return <Loading />

  return (
    <div className='px-4 sm:px-6 lg:px-8 mt-[15vh]'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold leading-6 text-gray-900'>
            {`Hello ${employee?.firstName},`}
          </h1>
          <p className='mt-2 text-sm text-gray-700'>These are your details.</p>
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
                    </tr>
                  </thead>

                  <tbody className='bg-white'>
                    <tr className='bg-gray-50'>
                      <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                        {employee?._id}
                      </td>
                      <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                        {employee?.email}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {employee?.firstName ? employee?.firstName : '-'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {employee?.lastName ? employee?.lastName : '-'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {employee?.gender ? employee?.gender : '-'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {employee?.hiredDate
                          ? employee?.hiredDate?.substring(0, 10)
                          : '-'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {employee?.phone ? employee?.phone : '-'}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {employee?.designation ? employee?.designation : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  console.log(session)

  if (user.category !== 'employee') {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default EmployeeDashboard

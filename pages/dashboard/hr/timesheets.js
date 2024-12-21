import React from 'react'
import { getLoginSession } from '../../../src/lib/auth'
import { findUser } from '../../../src/lib/user'
import { useModalContext } from '../../../src/context/ModalContext'
import { EmptyState } from '../../../src/components/Reusables/EmptyState'
import { useAllTimeStampDetailsHook } from '../../../src/hooks/useAllTimeStampDetailsHook'
import { Loading } from '../../../src/components/Reusables/Loading'

const HRTimeSheets = () => {
  const { timestamps, isLoading } = useAllTimeStampDetailsHook()
  const { setIsOpen, setForm } = useModalContext()

  const handleClickHandler = () => {
    setIsOpen(true)
    setForm('addTimestampForm')
  }

  if (isLoading) return <Loading />

  return (
    <div className='px-4 sm:px-6 lg:px-8 mt-[15vh]'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold leading-6 text-gray-900'>
            TimeSheets
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the timestamps of an employee in the company.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            onClick={handleClickHandler}
            className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add Timestamps
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
                        Timestamp Id
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Employee Id
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Date
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        No of hours worked
                      </th>
                    </tr>
                  </thead>
                  {timestamps?.length > 0 && (
                    <tbody className='bg-white'>
                      {timestamps?.map((tsp, tspId) => (
                        <tr
                          key={tsp._id}
                          className={tspId % 2 === 0 ? undefined : 'bg-gray-50'}
                        >
                          <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                            {tsp?._id}
                          </td>
                          <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                            {tsp?.user}
                          </td>
                          <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                            {tsp?.date?.substring(0, 10)}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {tsp?.hoursWorked}
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
      {!timestamps && (
        <>
          <EmptyState
            heading={'Time Stamps not found.'}
            description={'There are no time stamps of your employees.'}
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

export default HRTimeSheets

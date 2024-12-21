import React from 'react'
import { getLoginSession } from '../../../src/lib/auth'
import { findUser } from '../../../src/lib/user'
import { EmptyState } from '../../../src/components/Reusables/EmptyState'
import { usePayrollHook } from '../../../src/hooks/useAllPayrollHook'
import { Loading } from '../../../src/components/Reusables/Loading'

const EmpPayroll = () => {
  const { payroll, isLoading, isError } = usePayrollHook()

  if (isLoading) return <Loading />

  return (
    <div className='px-4 sm:px-6 lg:px-8 mt-[15vh]'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold leading-6 text-gray-900'>
            Payroll
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the payrolls of yours in the company.
          </p>
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
                        Payroll Id
                      </th>
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
                        Base Pay
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Variable Pay
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Tax Amount
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Total Salary
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                      >
                        Pay Date
                      </th>
                    </tr>
                  </thead>
                  {payroll?.length > 0 && (
                    <tbody className='bg-white'>
                      {payroll?.map((pyl, pylIdx) => (
                        <tr
                          key={pyl._id}
                          className={
                            pylIdx % 2 === 0 ? undefined : 'bg-gray-50'
                          }
                        >
                          <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                            {pyl?._id}
                          </td>
                          <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                            {pyl?.user}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {pyl?.basePay}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {pyl?.variablePay}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {pyl?.taxAmount}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {pyl?.totalSalary}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {pyl?.payDate?.substring(0, 10)}
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
      {!payroll && (
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

  if (user.category !== 'employee') {
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

export default EmpPayroll

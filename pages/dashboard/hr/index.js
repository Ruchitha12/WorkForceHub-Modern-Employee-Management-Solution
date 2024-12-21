import { useAllEmployeeHook } from '../../../src/hooks/useAllEmployeeDetails'
import { getLoginSession } from '../../../src/lib/auth'
import { findUser } from '../../../src/lib/user'

const HRDashboard = () => {
  const { employee } = useAllEmployeeHook()
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto text-center max-w-full lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Our team
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role='list'
          className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'
        >
          {employee?.map(person => (
            <li key={person._id}>
              <img
                className='aspect-[3/2] w-full rounded-2xl object-cover'
                src={
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
                }
                alt=''
              />
              <h3 className='mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                {person.email}
              </h3>
              <p className='text-base leading-7 text-gray-600'>
                {person.category.toUpperCase()}
              </p>
            </li>
          ))}
        </ul>
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

export default HRDashboard

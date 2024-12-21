import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const useEmployeeHook = id => {
  const { data, error } = useSWR(
    `/api/hr/employee/employeeDetails?userId=${id}`,
    fetcher
  )
  return {
    employee: data?.details,
    isLoading: !error && !data,
    isError: error
  }
}

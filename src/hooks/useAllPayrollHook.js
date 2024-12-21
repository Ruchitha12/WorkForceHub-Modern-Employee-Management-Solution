import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const usePayrollHook = id => {
  const { data, error } = useSWR(`/api/hr/employee/payroll`, fetcher)
  return {
    payroll: data?.details,
    isLoading: !error && !data,
    isError: error
  }
}

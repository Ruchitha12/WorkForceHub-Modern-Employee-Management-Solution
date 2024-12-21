import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const useAllEmployeeHook = id => {
  const { data, error } = useSWR(`/api/hr/employee`, fetcher)
  return {
    employee: data?.details,
    isLoading: !error && !data,
    isError: error
  }
}

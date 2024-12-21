import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const useDepartmentDetails = user => {
  const { data, error } = useSWR(`/api/hr/department`, fetcher)
  return {
    department: data?.details,
    isLoading: !error && !data,
    isError: error
  }
}

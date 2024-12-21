import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const useAllTimeStampDetailsHook = () => {
  const { data, error } = useSWR(`/api/hr/employee/timestamps`, fetcher)
  return {
    timestamps: data?.details,
    isLoading: !error && !data,
    isError: error
  }
}

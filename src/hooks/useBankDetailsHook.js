import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export const useBankDetailsHook = id => {
  const { data, error } = useSWR(
    `/api/hr/employee/bankDetails?userId=${id}`,
    fetcher
  )
  return {
    bankDetails: data?.details,
    isLoading: !error && !data,
    isError: error
  }
}

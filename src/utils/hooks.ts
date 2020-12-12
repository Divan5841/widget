import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { notification } from 'antd'

const args = {
  key: '1',
  message: 'Что-то пошло не так',
  duration: 3,
}

interface IUseFetchResponse<T> {
  data: T | undefined
  isLoading: boolean
}

export const useFetch = <T>(
  config: AxiosRequestConfig,
  conditions: unknown[] = [],
): IUseFetchResponse<T> => {
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => await axios(config))()
      .then(({ data }: AxiosResponse<T>) => setData(data))
      .catch((e) => {
        console.log('e', e);
        notification.open(args);
      })
      .finally(() => setIsLoading(false))
  }, conditions) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading }
}

import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export type RestResponse<T = {}> = Promise<AxiosResponse<T>>

export const URLS_API = {
  TIMELINES: '/timelines',
}

interface IGetTimelinesPayload {
  date: string
}

export const SCHEDULE_STATUS_TRANSLATE = {
  opened: 'Открыто',
  close: 'Закрыто',
  lunch: 'Обед',
}

export interface Schedule {
  status: 'opened' | 'close' | 'lunch'
  from: string
  to: string
}

export interface Timeline {
  type: 'services' | 'fun'
  name: string
  schedule: Schedule[]
}

export type IGetTimelinesResponse = Timeline[]

export const getTimelinesRequest = (
  payload?: IGetTimelinesPayload,
): RestResponse<IGetTimelinesResponse> =>
  axios.post(URLS_API.TIMELINES, payload)

type UseTimelines = (
  date?: Date,
) => [IGetTimelinesResponse | undefined, boolean]

export const useTimelines: UseTimelines = (date) => {
  const [timelines, setTimelines] = useState<IGetTimelinesResponse>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)

        if (date) {
          const formattedDate = date.toLocaleString().split(',')[0]

          const { data: timelines } = await getTimelinesRequest({
            date: formattedDate,
          })

          setTimelines(timelines)
        } else {
          const { data: timelines } = await getTimelinesRequest()

          setTimelines(timelines)
        }
      } catch (e) {
        console.log('e', e)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [date])

  return [timelines, isLoading]
}

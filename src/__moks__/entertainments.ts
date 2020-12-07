export interface IEntertainment {
  name: string
  workingTimes: {
    startDt: number
    endDt: number
    status: 'work' | 'off'
  }[]
}

export const ENTERTAINMENTS: IEntertainment[] = [
  {
    name: 'Хаски парк',
    workingTimes: [
      { startDt: 11, endDt: 14, status: 'work' },
      { startDt: 14, endDt: 15, status: 'off' },
      { startDt: 15, endDt: 18, status: 'work' },
      { startDt: 18, endDt: 22, status: 'off' },
    ],
  },
  {
    name: 'Оленья ферма',
    workingTimes: [
      { startDt: 11, endDt: 12, status: 'off' },
      { startDt: 12, endDt: 15, status: 'work' },
      { startDt: 15, endDt: 22, status: 'off' },
    ],
  },
  {
    name: 'Родельбан',
    workingTimes: [
      { startDt: 11, endDt: 12, status: 'work' },
      { startDt: 12, endDt: 13, status: 'off' },
      { startDt: 13, endDt: 14, status: 'work' },
      { startDt: 14, endDt: 22, status: 'off' },
    ],
  },
  {
    name: 'Канатка 1440',
    workingTimes: [
      { startDt: 11, endDt: 16, status: 'work' },
      { startDt: 16, endDt: 18, status: 'work' },
      { startDt: 18, endDt: 22, status: 'off' },
    ],
  },
]

export const SERVICES: IEntertainment[] = [
  {
    name: 'Оленья ферма',
    workingTimes: [
      { startDt: 11, endDt: 14, status: 'off' },
      { startDt: 14, endDt: 15, status: 'work' },
      { startDt: 15, endDt: 22, status: 'off' },
    ],
  },
  {
    name: 'Сервис',
    workingTimes: [
      { startDt: 11, endDt: 14, status: 'work' },
      { startDt: 14, endDt: 15, status: 'off' },
      { startDt: 15, endDt: 18, status: 'work' },
      { startDt: 18, endDt: 22, status: 'off' },
    ],
  },
  {
    name: 'Родельбан',
    workingTimes: [
      { startDt: 11, endDt: 12, status: 'work' },
      { startDt: 12, endDt: 15, status: 'off' },
      { startDt: 15, endDt: 20, status: 'work' },
      { startDt: 20, endDt: 22, status: 'off' },
    ],
  },
  {
    name: 'Канатка 1440',
    workingTimes: [
      { startDt: 11, endDt: 13, status: 'work' },
      { startDt: 13, endDt: 14, status: 'off' },
      { startDt: 14, endDt: 22, status: 'work' },
    ],
  },
]

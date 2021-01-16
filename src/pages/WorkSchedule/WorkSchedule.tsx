import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Tabs } from 'antd'
import { TabsProps } from 'antd/es/tabs'
import moment from 'moment'

import {
  TimelinesTable,
  TimelinesType,
} from './components/TimelinesTable/TimelinesTable'
import { Calendar, Empty, Loader } from '../../components'
import { Timeline, useTimelines } from './store'
import { ArrowLeftS, CalendarIcon, isEmpty } from '../../utils'
import styles from './WorkSchedule.module.scss'

const MAIN_TAB_KEY = {
  TODAY: 'сегодня',
  ALL_YEAR: 'весь год',
}

const TODAY = new Date(moment().startOf('d').toISOString())

export const WorkSchedule: FC = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isShowCalendarIcon, setIsShowCalendarIcon] = useState(false)
  const [isShowButtonShow, setIsShowButtonShow] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(TODAY)
  const [dateTimeline, setDateTimeline] = useState<Date | undefined>(TODAY)
  const [timelinesType, setTimelinesType] = useState<TimelinesType>('day')

  const onSelectDateHandler = useCallback((date: Date) => {
    setDateTimeline(date)
    setIsCalendarOpen(false)
  }, [])

  const onChangeMainTabHandler: TabsProps['onChange'] = useCallback(
    (activeKey) => {
      if (activeKey === MAIN_TAB_KEY.TODAY) {
        setSelectedDate(TODAY)
      } else {
        setSelectedDate(undefined)
      }

      setDateTimeline(TODAY)
      setIsShowCalendarIcon(activeKey !== MAIN_TAB_KEY.TODAY)
      setIsShowButtonShow(activeKey !== MAIN_TAB_KEY.TODAY)
    },
    [],
  )

  const [timelines, isLoading] = useTimelines(selectedDate)
  const [services, setServices] = useState<Timeline[]>([])
  const [fun, setFun] = useState<Timeline[]>([])

  useEffect(() => {
    if (!timelines) return

    const services = timelines.filter(({ type }) => type === 'services')
    setServices(services)

    const fun = timelines.filter(({ type }) => type === 'fun')
    setFun(fun)

    setTimelinesType(selectedDate ? 'day' : 'year')
  }, [timelines])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonBack}>
          <ArrowLeftS />
          <span>НАЗАД</span>
        </div>

        <div className={styles.title}>
          <span>РЕЖИМ РАБОТЫ</span>
        </div>

        <Tabs onChange={onChangeMainTabHandler} className={styles.mainTabs}>
          <Tabs.TabPane
            tab={MAIN_TAB_KEY.TODAY.toUpperCase()}
            key={MAIN_TAB_KEY.TODAY}
          />
          <Tabs.TabPane
            tab={MAIN_TAB_KEY.ALL_YEAR.toUpperCase()}
            key={MAIN_TAB_KEY.ALL_YEAR}
          />
        </Tabs>

        <Tabs
          destroyInactiveTabPane
          className={styles.tabs}
          tabBarExtraContent={{
            right: isShowCalendarIcon ? (
              <Button
                icon={<CalendarIcon />}
                onClick={() => setIsCalendarOpen(true)}
                type="primary"
              />
            ) : (
              <></>
            ),
          }}
        >
          <Tabs.TabPane tab="СЕРВИСЫ" key="services">
            {isLoading ? (
              <Loader className={styles.loader} />
            ) : isEmpty(services) || !services ? (
              <Empty />
            ) : (
              <TimelinesTable
                timelines={services}
                type={timelinesType}
                dateTimeline={dateTimeline}
              />
            )}
          </Tabs.TabPane>

          <Tabs.TabPane tab="РАЗВЛЕЧЕНИЯ" key="entertainments">
            {isLoading ? (
              <Loader className={styles.loader} />
            ) : isEmpty(fun) || !fun ? (
              <Empty />
            ) : (
              <TimelinesTable
                timelines={fun}
                type={timelinesType}
                dateTimeline={dateTimeline}
              />
            )}
          </Tabs.TabPane>
        </Tabs>

        <div className={styles.mark}>
          *Данные о работе являются предварительными и могут быть изменены в
          зависимости от погодных условий и графика регламентных работ
        </div>

        {isShowButtonShow && (
          <Button type="primary" size="large" className={styles.buttonShow}>
            Посмотреть номера
          </Button>
        )}
      </div>

      <Calendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        date={dateTimeline}
        onSelectDate={onSelectDateHandler}
      />
    </>
  )
}

import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Tabs } from 'antd'
import { TabsProps } from 'antd/es/tabs'

import { ENTERTAINMENTS } from '../../__moks__/entertainments'
import { TableServices } from './components/TableServices/TableServices'
import { TimelinesTable } from './components/Services/TimelinesTable'
import { Calendar, Empty, Loader } from '../../components'
import {
  ArrowLeftS,
  CalendarIcon,
  isEmpty,
  Timeline,
  useTimelines,
} from '../../utils'
import styles from './WorkSchedule.module.scss'

export const START_WORK_TIME = 11
export const END_WORK_TIME = 22

const MAIN_TAB_KEY = {
  TODAY: 'сегодня',
  ALL_YEAR: 'весь год',
}

const TODAY = new Date()

export const WorkSchedule: FC = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isShowCalendarIcon, setIsShowCalendarIcon] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(TODAY)

  const onSelectDateHandler = useCallback((date: Date) => {
    setSelectedDate(date)
    setIsCalendarOpen(false)
  }, [])

  const onChangeMainTabHandler: TabsProps['onChange'] = useCallback(
    (activeKey) => {
      if (activeKey === MAIN_TAB_KEY.TODAY) {
        setSelectedDate(TODAY)
      } else {
        setSelectedDate(undefined)
      }

      setIsShowCalendarIcon(activeKey !== MAIN_TAB_KEY.TODAY)
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
              <TimelinesTable timelines={services} />
            )}
          </Tabs.TabPane>

          <Tabs.TabPane tab="РАЗВЛЕЧЕНИЯ" key="entertainments">
            <TableServices services={ENTERTAINMENTS} />
          </Tabs.TabPane>
        </Tabs>

        <div className={styles.mark}>
          *Данные о работе являются предварительными и могут быть изменены в
          зависимости от погодных условий и графика регламентных работ
        </div>

        <Button type="primary" size="large" className={styles.buttonShow}>
          Посмотреть номера
        </Button>
      </div>

      <Calendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        date={selectedDate}
        onSelectDate={onSelectDateHandler}
      />
    </>
  )
}

import React, { FC, useCallback, useState } from 'react'
import { Button, ConfigProvider, Modal, Tabs } from 'antd'
import { TabsProps } from 'antd/es/tabs'
import ru_RU from 'antd/lib/locale-provider/ru_RU'
import moment from 'moment'
import Calendar from 'react-calendar'

import { TableServices } from './components/TableServices/TableServices'
import { ENTERTAINMENTS, SERVICES } from '../../__moks__/entertainments'
import { ArrowLeftS, CalendarIcon, Cross, Left, Right } from '../../utils/icons'
import styles from './WorkSchedule.module.scss'
import './../../utils/calendar.scss'

export const START_WORK_TIME = 11
export const END_WORK_TIME = 22

export const WorkSchedule: FC = () => {
  const [isDatePrickerOpen, setIsDatePrickerOpen] = useState(false)
  const [isShowCalendarIcon, setIsShowCalendarIcon] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | Date[]>(new Date())

  const onAcceptHandler = useCallback((date: Date | Date[]) => {
    setSelectedDate(date)
    setIsDatePrickerOpen(false)
  }, [])

  const onChangeMainTabHandler: TabsProps['onChange'] = useCallback(
    (activeKey) => {
      if (activeKey === 'today') {
        setSelectedDate(new Date())
      }

      setIsShowCalendarIcon(activeKey !== 'today')
    },
    [],
  )

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
          <Tabs.TabPane tab="СЕГОДНЯ" key="today" />
          <Tabs.TabPane tab="ВЕСЬ ГОД" key="allYear" />
        </Tabs>

        <Tabs
          destroyInactiveTabPane
          className={styles.tabs}
          tabBarExtraContent={{
            right: isShowCalendarIcon ? (
              <Button
                icon={<CalendarIcon />}
                onClick={() => setIsDatePrickerOpen(true)}
                type="primary"
              />
            ) : (
              <></>
            ),
          }}
        >
          <Tabs.TabPane tab="СЕРВИСЫ" key="services">
            <TableServices services={SERVICES} />
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

      <Modal
        visible={isDatePrickerOpen}
        onCancel={() => setIsDatePrickerOpen(false)}
        width="min-content"
        footer={null}
        closable={false}
        destroyOnClose
        maskStyle={{ background: '#232E43' }}
        className={styles.modal}
        centered
      >
        <div
          className={styles.buttonCross}
          onClick={() => setIsDatePrickerOpen(false)}
        >
          <Cross />
        </div>

        <ConfigProvider locale={ru_RU}>
          <Calendar
            onChange={onAcceptHandler}
            value={selectedDate}
            locale="ru"
            prev2Label={null}
            next2Label={null}
            prevLabel={<Left />}
            nextLabel={<Right />}
            formatMonthYear={(locale, date) =>
              moment(date).format('MMMM, YYYY')
            }
          />
        </ConfigProvider>
      </Modal>
    </>
  )
}

import React, { FC, useCallback, useState } from 'react'
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Button, ConfigProvider, Modal, Tabs } from 'antd'
import { TabsProps } from 'antd/es/tabs'
import ru_RU from 'antd/lib/locale-provider/ru_RU'
import moment from 'moment'
import Calendar from 'react-calendar'

import { TableServices } from './components/TableServices/TableServices'
import { ENTERTAINMENTS, SERVICES } from '../../__moks__/entertainments'
import styles from './WorkSchedule.module.scss'
import './../../utils/calendar.scss'

export const START_WORK_TIME = 11
export const END_WORK_TIME = 22

export const WorkSchedule: FC = () => {
  const [isDatePrickerOpen, setIsDatePrickerOpen] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | Date[]>(new Date())

  const onAcceptHandler = useCallback((date: Date | Date[]) => {
    setSelectedDate(date)
    setIsDatePrickerOpen(false)
  }, [])

  const onChangeTabHandler: TabsProps['onChange'] = useCallback((activeKey) => {
    if (activeKey === 'today') {
      setSelectedDate(new Date())
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonBack}>
          <Button icon={<ArrowLeftOutlined />}>Назад</Button>
        </div>

        <div className={styles.title}>
          <span>Режим работы</span>

          <span>{moment(selectedDate as Date).format('D MMM YYYY')}</span>

          <Button
            icon={<CalendarOutlined />}
            onClick={() => setIsDatePrickerOpen(true)}
            type="primary"
          />
        </div>

        <Tabs size="large" onChange={onChangeTabHandler}>
          <Tabs.TabPane tab="Сегодня" key="today" />
          <Tabs.TabPane tab="Весь год" key="allYear" />
        </Tabs>

        <Tabs destroyInactiveTabPane>
          <Tabs.TabPane tab="Сервисы" key="services">
            <TableServices services={SERVICES} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Развлечения" key="entertainments">
            <TableServices services={ENTERTAINMENTS} />
          </Tabs.TabPane>
        </Tabs>

        <div className={styles.mark}>
          *Данные о работе являются предварительными и могут быть изменены в
          зависимости от погодных условий и графика регламентных работ
        </div>

        <Button type="primary" className={styles.buttonShow}>
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
      >
        <ConfigProvider locale={ru_RU}>
          <Calendar
            onChange={onAcceptHandler}
            value={selectedDate}
            locale="ru"
            prev2Label={null}
            next2Label={null}
            prevLabel={<LeftOutlined />}
            nextLabel={<RightOutlined />}
            formatMonthYear={(locale, date) => moment(date).format('MMMM YYYY')}
          />
        </ConfigProvider>
      </Modal>
    </>
  )
}

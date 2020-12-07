import React, { FC, useCallback, useState } from 'react'
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons'
import { Button, Calendar, Modal, Tabs, ConfigProvider } from 'antd'
import ru_RU from 'antd/lib/locale-provider/ru_RU'

import { TableServices } from './components/TableServices/TableServices'
import { ENTERTAINMENTS, SERVICES } from '../../__moks__/entertainments'
import styles from './WorkSchedule.module.scss'

export const START_WORK_TIME = 11
export const END_WORK_TIME = 22

export const WorkSchedule: FC = () => {
  const [isDatePrickerOpen, setIsDatePrickerOpen] = useState(false)

  const onSelectDate = useCallback((value) => {
    console.log('value', value)
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonBack}>
          <Button icon={<ArrowLeftOutlined />}>Назад</Button>
        </div>

        <div className={styles.title}>
          <span>Режим работы</span>

          <Button
            icon={<CalendarOutlined />}
            onClick={() => setIsDatePrickerOpen(true)}
            type="primary"
          />
        </div>

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

        <Button type="primary">Посмотреть номера</Button>
      </div>

      <Modal
        visible={isDatePrickerOpen}
        cancelText="Отмена"
        onCancel={() => setIsDatePrickerOpen(false)}
        onOk={() => setIsDatePrickerOpen(false)}
        closable={false}
        destroyOnClose
      >
        <ConfigProvider locale={ru_RU}>
          <Calendar fullscreen={false} onSelect={onSelectDate} />
        </ConfigProvider>
      </Modal>
    </>
  )
}

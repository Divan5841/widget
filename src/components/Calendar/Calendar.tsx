import React, { FC } from 'react'
import { ConfigProvider, Modal } from 'antd'
import ru_RU from 'antd/lib/locale-provider/ru_RU'
import ReactCalendar, { OnChangeDateCallback } from 'react-calendar'
import moment from 'moment'

import { Cross, Left, Right } from '../../utils'
import styles from './Calendar.module.scss'
import './Calendar.scss'

interface ICalendarProps {
  isOpen: boolean
  onClose: () => void
  date?: Date
  onSelectDate: (date: Date) => void
}

export const Calendar: FC<ICalendarProps> = ({
  isOpen,
  onClose,
  date,
  onSelectDate,
}) => {
  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      width="min-content"
      footer={null}
      closable={false}
      destroyOnClose
      maskStyle={{ background: '#232E43' }}
      className={styles.modal}
      centered
    >
      <div className={styles.buttonCross} onClick={onClose}>
        <Cross />
      </div>

      <ConfigProvider locale={ru_RU}>
        <ReactCalendar
          onChange={onSelectDate as OnChangeDateCallback}
          value={date}
          locale="ru"
          prev2Label={null}
          next2Label={null}
          prevLabel={<Left />}
          nextLabel={<Right />}
          formatMonthYear={(locale, date) => moment(date).format('MMMM, YYYY')}
        />
      </ConfigProvider>
    </Modal>
  )
}

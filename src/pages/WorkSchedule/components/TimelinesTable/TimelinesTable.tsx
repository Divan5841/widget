import React, { FC, useCallback, useEffect, useMemo } from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import clsx from 'clsx'
import moment from 'moment'

import { TimelinesTooltip } from './TimelinesTooltip/TimelinesTooltip'
import { getRangeArray, OneTime, TimelineIcon } from '../../../../utils'
import { Schedule, Timeline } from '../../store'
import styles from './TimelinesTable.module.scss'

const TIMELINE_CALL_WIDTH = 48

export type TimelinesType = 'day' | 'year'

interface ITimelinesTableProps {
  timelines: Timeline[]
  type: TimelinesType
  dateTimeline?: Date
}

export const TimelinesTable: FC<ITimelinesTableProps> = ({
  timelines,
  type,
  dateTimeline,
}) => {
  const [timeline, getStyles] = useMemo(() => {
    if (type === 'day') {
      return [
        getRangeArray(0, 24).map((hour, i) => (
          <div key={hour + i}>
            <div>{moment({ hour }).format('HH:mm')}</div>
            <TimelineIcon />
          </div>
        )),
        (from: string, to: string) => ({
          gridColumnStart: Number(moment(from, 'HH:mm').format('H')) + 1,
          gridColumnEnd: (Number(moment(to, 'HH:mm').format('H')) || 24) + 1,
        }),
      ]
    }

    if (type === 'year') {
      const start = moment(timelines[0].schedule[0].from, 'DD:MM:YYYY')
      const end = moment(
        timelines[0].schedule[timelines[0].schedule.length - 1].to,
        'DD:MM:YYYY',
      ).add('d', 5)
      const dur = moment.duration(end.diff(start)).asDays()

      return [
        getRangeArray(0, dur).map((day, i) => (
          <div key={day + i}>
            <div>{moment(start).add(day, 'd').format('DD.MM')}</div>
            <OneTime />
          </div>
        )),
        (from: string, to: string) => {
          const gridColumnStart =
            moment.duration(moment(from, 'DD:MM:YYYY').diff(start)).asDays() + 1

          const gridColumnEnd =
            moment.duration(moment(to, 'DD:MM:YYYY').diff(start)).asDays() + 1

          return {
            gridColumnStart,
            gridColumnEnd,
          }
        },
      ]
    }

    return [null, () => ({})]
  }, [timelines, type])

  const goTo = useCallback((url: string) => {
    window.open(url, '_blank')
  }, [])

  useEffect(() => {
    const timeline = document.querySelector('.ant-table-body')

    if (timeline && dateTimeline) {
      const start = moment(timelines[0].schedule[0].from, 'DD:MM:YYYY')
      const end = moment(dateTimeline, 'DD:MM:YYYY')
      const dur = moment.duration(end.diff(start)).asDays()

      timeline.scrollLeft = TIMELINE_CALL_WIDTH * dur
    }
  }, [dateTimeline, timelines])

  const data = timelines.map(({ url, schedule, name, type }, i) => ({
    key: name + i,
    label: [name, url],
    timeline: schedule,
  }))

  const columns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: 'label',
      fixed: 'left',
      render: ([name, url]) => (
        <div onClick={() => goTo(url)} className={styles.label}>
          <span>{name}</span>
        </div>
      ),
    },

    {
      title: <div className={styles.headerTimeline}>{timeline}</div>,
      dataIndex: 'timeline',
      width: 'max-content',
      render: (schedule: Schedule[]) => (
        <div className={styles.timeline}>
          {schedule.map(({ status, from, to }, i) => (
            <TimelinesTooltip status={status} key={from + i}>
              <div
                className={clsx(styles.item, {
                  [styles.itemWorking]: status === 'opened',
                  [styles.itemLunch]: status === 'lunch',
                })}
                style={getStyles(from, to)}
              />
            </TimelinesTooltip>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className={styles.timelineUpright}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: true, y: '380px' }}
          sticky
          pagination={false}
          className={styles.table}
        />
      </div>
    </div>
  )
}

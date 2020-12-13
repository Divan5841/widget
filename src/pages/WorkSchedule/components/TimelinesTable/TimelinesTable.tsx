import React, { FC, useMemo } from 'react'
import clsx from 'clsx'
import moment from 'moment'

import { TimelinesTooltip } from './TimelinesTooltip/TimelinesTooltip'
import { getRangeArray, OneTime, TimelineIcon } from '../../../../utils'
import { Timeline } from '../../store'
import styles from './TimelinesTable.module.scss'

export type TimelinesType = 'day' | 'year'

interface ITimelinesTableProps {
  timelines: Timeline[]
  type: TimelinesType
}

export const TimelinesTable: FC<ITimelinesTableProps> = ({
  timelines,
  type,
}) => {
  const [timeline, getStyles] = useMemo(() => {
    if (type === 'day') {
      return [
        getRangeArray(0, 24).map((hour) => (
          <div>
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
      )
      const dur = moment.duration(end.diff(start)).asDays()

      return [
        getRangeArray(0, dur).map((day) => (
          <div>
            <div>{moment(start).add(day, 'd').format('DD.MM')}</div>
            <OneTime />
          </div>
        )),
        (from: string, to: string) => {
          const gridColumnStart = moment
            .duration(moment(from, 'DD:MM:YYYY').diff(start))
            .asDays() + 1

          const gridColumnEnd = moment
            .duration(moment(to, 'DD:MM:YYYY').diff(start))
            .asDays() + 1

          return {
            gridColumnStart,
            gridColumnEnd,
          }
        },
      ]
    }

    return [null, () => ({})]
  }, [timelines, type])

  return (
    <div className={styles.table}>
      <div>
        <div className={styles.headerTimeline} />

        {timelines.map(({ name }) => (
          <div className={styles.label}>{name}</div>
        ))}
      </div>

      <div>
        <div className={styles.headerTimeline}>{timeline}</div>

        {timelines.map(({ schedule }) => (
          <div className={styles.timeline}>
            {schedule.map(({ status, from, to }) => (
              <TimelinesTooltip status={status}>
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
        ))}
      </div>
    </div>
  )
}

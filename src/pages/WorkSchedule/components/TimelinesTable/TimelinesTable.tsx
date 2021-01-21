import React, { FC, useCallback, useEffect, useMemo } from 'react'
import clsx from 'clsx'
import moment from 'moment'

import { TimelinesTooltip } from './TimelinesTooltip/TimelinesTooltip'
import { getRangeArray, OneTime, TimelineIcon } from '../../../../utils'
import { Timeline } from '../../store'
import styles from './TimelinesTable.module.scss'

const TIMELINE_ID = 'timelineId'
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
      const start = moment(
        timelines[0].schedule[0].from,
        'DD:MM:YYYY',
      ).subtract('d', 1)
      const end = moment(
        timelines[0].schedule[timelines[0].schedule.length - 1].to,
        'DD:MM:YYYY',
      ).add('d', 30)
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
    const timeline = document.getElementById(TIMELINE_ID)

    if (timeline && dateTimeline) {
      const start = moment(timelines[0].schedule[0].from, 'DD:MM:YYYY')
      const end = moment(dateTimeline, 'DD:MM:YYYY')
      const dur = moment.duration(end.diff(start)).asDays()

      timeline.scrollLeft = TIMELINE_CALL_WIDTH * dur
    }
  }, [dateTimeline, timelines])

  return (
    <div className={styles.container}>
      <div className={styles.table} id={TIMELINE_ID}>
        <div>
          <div className={styles.headerTimelineEmpty} />

          {timelines.map(({ name, url }, i) => (
            <div
              key={name + i}
              onClick={() => goTo(url)}
              className={styles.label}
            >
              {name}
            </div>
          ))}
        </div>

        <div>
          <div className={styles.headerTimeline}>{timeline}</div>

          {timelines.map(({ schedule, url }, i) => (
            <div
              key={schedule.toString() + i}
              onClick={() => goTo(url)}
              className={styles.timeline}
            >
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
          ))}
        </div>
      </div>
    </div>
  )
}

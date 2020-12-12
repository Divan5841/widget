import React, { FC } from 'react'
import clsx from 'clsx'
import moment from 'moment'

import { TimelinesTooltip } from './TimelinesTooltip/TimelinesTooltip'
import { getRangeArray, TimelineIcon } from '../../../../utils'
import { Timeline } from '../../store'
import styles from './TimelinesTable.module.scss'

interface ITimelinesTableProps {
  timelines: Timeline[]
}

export const TimelinesTable: FC<ITimelinesTableProps> = ({ timelines }) => {
  return (
    <div className={styles.table}>
      <div>
        <div className={styles.headerTimeline} />

        {timelines.map(({ name }) => (
          <div className={styles.label}>{name}</div>
        ))}
      </div>

      <div>
        <div className={styles.headerTimeline}>
          {getRangeArray(0, 24).map((hour) => (
            <div>
              <div>{moment({ hour }).format('HH:mm')}</div>
              <TimelineIcon />
            </div>
          ))}
        </div>

        {timelines.map(({ schedule }) => (
          <div className={styles.timeline}>
            {schedule.map(({ status, from, to }) => (
              <TimelinesTooltip status={status}>
                <div
                  className={clsx(styles.item, {
                    [styles.itemWorking]: status === 'opened',
                    [styles.itemLunch]: status === 'lunch',
                  })}
                  style={{
                    gridColumnStart:
                      Number(moment(from, 'HH:mm').format('H')) + 1,
                    gridColumnEnd:
                      (Number(moment(to, 'HH:mm').format('H')) || 24) + 1,
                  }}
                />
              </TimelinesTooltip>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

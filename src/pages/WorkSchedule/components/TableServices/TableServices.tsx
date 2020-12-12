import React, { FC } from 'react'
import clsx from 'clsx'
import { Tooltip } from 'antd'

import { IEntertainment } from '../../../../__moks__/entertainments'
import { END_WORK_TIME, START_WORK_TIME } from '../../WorkSchedule'
import { getRangeArray } from '../../../../utils'
import styles from './TableServices.module.scss'

interface ITableServicesProps {
  services: IEntertainment[]
}

export const TableServices: FC<ITableServicesProps> = ({ services }) => (
  <div className={styles.container}>
    <div className={styles.table}>
      <div>
        <div className={styles.row} />

        {services.map(({ name }) => (
          <div className={styles.row}>
            <div className={styles.label}>{name}</div>
          </div>
        ))}
      </div>

      <div className={styles.timelines}>
        <div className={styles.row}>
          <div className={styles.header_timeline}>
            {getRangeArray(START_WORK_TIME + 1, END_WORK_TIME).map((time) => (
              <div className={styles.time}>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>

        {services.map(({ workingTimes }) => (
          <div className={styles.row}>
            <div className={styles.timeline}>
              {workingTimes.map(({ startDt, endDt, status }) => (
                <Tooltip
                  title={
                    status === 'work' ? (
                      <span style={{ color: '#215575' }}>
                        Скорее всего работает
                      </span>
                    ) : (
                      ''
                    )
                  }
                  color="#F5FBFF"
                  arrowPointAtCenter
                  destroyTooltipOnHide
                >
                  <div
                    className={clsx(styles.item, {
                      [styles.working]: status === 'work',
                    })}
                    style={{
                      gridColumnStart: startDt - START_WORK_TIME + 1,
                      gridColumnEnd: endDt - START_WORK_TIME + 1,
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

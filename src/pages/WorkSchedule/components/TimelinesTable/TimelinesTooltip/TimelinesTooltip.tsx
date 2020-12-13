import React, { FC } from 'react'
import { Tooltip } from 'antd'

import { Schedule, SCHEDULE_STATUS_TRANSLATE } from '../../../store'

interface ITimelinesTooltipProps {
  status: Schedule['status']
}

export const TimelinesTooltip: FC<ITimelinesTooltipProps> = ({
  status,
  children,
}) => (
  <Tooltip
    title={
      <span style={{ color: '#215575' }}>
        {SCHEDULE_STATUS_TRANSLATE[status]}
      </span>
    }
    color="#f5fbff"
    destroyTooltipOnHide
  >
    {children}
  </Tooltip>
)

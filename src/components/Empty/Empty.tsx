import React, { FC } from 'react'
import { Empty as EmptyAnt } from 'antd'

import { EmptyProps } from 'antd/es/empty'

interface IEmptyProps extends EmptyProps {
  className?: string
}

export const Empty: FC<IEmptyProps> = ({ className, ...otherEmptyProps }) => (
  <EmptyAnt
    image={EmptyAnt.PRESENTED_IMAGE_SIMPLE}
    className={className}
    description="Нет информации"
    {...otherEmptyProps}
  />
)

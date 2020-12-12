import React, { FC } from 'react'
import { Spin } from 'antd'
import clsx from 'clsx'

import styles from './Loader.module.scss'

interface ILoaderProps {
  global?: boolean
  className?: string
  spinning?: boolean
}

export const Loader: FC<ILoaderProps> = ({
  global,
  className,
  spinning = true,
  children,
}) => {
  if (children) {
    return (
      <Spin size="large" style={{ maxHeight: 'none' }} spinning={spinning}>
        {children}
      </Spin>
    )
  }

  return (
    <Spin
      size="large"
      className={clsx(styles.loader, className, { [styles.global]: global })}
    />
  )
}

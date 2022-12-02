import React, { FC } from 'react'
import styles from '../../styles/Layout.module.css'

const LayoutBase: FC<{ children: JSX.Element }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default LayoutBase

import React from 'react'
import { Spin } from 'antd'
import style from './profile.module.css'

const Loading = () => {
  return (
    <div className={style.l_center}>
      <Spin/>
    </div>
  )
}
export default Loading

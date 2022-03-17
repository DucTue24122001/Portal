import { Modal, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeSheetRedux } from '../../redux/timesheet'

export default function DialogTimeSheetRedux({ isModalVisible, handleOk, handleCancel, valueModal }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(timeSheetRedux.searchTimeLogs(valueModal))
  // },[valueModal])
  // const timelog = useSelector(state=>state.timesheet.dataTimeLog)
  // const columns = [
  //   {
  //     title: 'id',
  //     dataIndex: 'id',
  //     key: 'id',
  //   },
  //   {
  //     title: 'Work date',
  //     dataIndex: 'work_date',
  //     key: 'workdate',
  //   },
  //   {
  //     title: 'Check Time',
  //     dataIndex: 'checktime',
  //     key: 'checktime',
  //   },
  // ];

  return (
    <>
      <Modal title='Time logs' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        {/* <Table columns={columns} dataSource={timelog} pagination={false} /> */}
      </Modal>
    </>
  )
}

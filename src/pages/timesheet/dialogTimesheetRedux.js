import { Modal, Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeSheetRedux } from '../../redux/timesheet'
import moment from 'moment'

export default function DialogTimeSheetRedux({ isModalVisible, handleOk, handleCancel, valueModal }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dispatch = useDispatch()
  useEffect(() => {
    if (valueModal !== null) {
      const timelog = valueModal.slice(0, 10).replace(/\//g, '-')
      dispatch(timeSheetRedux.searchTimeLogs(timelog))
    }
  }, [valueModal])
  const timelog = useSelector((state) => state.timesheet.dataTimeLog)
  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: 'Work date',
      dataIndex: 'work_date'
    },
    {
      title: 'Check Time',
      dataIndex: 'checktime'
    }
  ]

  return (
    <>
      <Modal
        style={{ fontWeight: 500 }}
        width={1000}
        footer={null}
        title='Time logs'
        visible={isModalVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Table columns={columns} dataSource={timelog} pagination={false} rowKey='id' />
      </Modal>
    </>
  )
}

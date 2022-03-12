import { Modal, Table } from 'antd'
import React from 'react'

export default function DialogTimeSheetRedux({ isModalVisible, handleOk, handleCancel, valueModal }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const columsModal = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Check in',
      dataIndex: 'checkin'
    },
    {
      title: 'Check in',
      dataIndex: 'checkout'
    },
    {
      title: 'Late',
      dataIndex: 'late'
    }
  ]

  return (
    <>
      <Modal title='Time logs' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <Table columns={columsModal} dataSource={valueModal} pagination={false} />
      </Modal>
    </>
  )
}

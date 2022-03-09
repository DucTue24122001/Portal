import { Modal, Table } from 'antd'
import React from 'react'
import { columsModal } from './columsTable'

export default function DialogTimeSheetRedux({ isModalVisible, handleOk, handleCancel, valueModal }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal title='Time logs' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <Table columns={columsModal} dataSource={valueModal} pagination={false} />
      </Modal>
    </>
  )
}

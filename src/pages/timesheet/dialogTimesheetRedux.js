import { Modal, Table } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function DialogTimeSheetRedux({ isModalVisible, handleOk, handleCancel, valueModal }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dispatch = useDispatch()
  // dispatch()

  return (
    <>
      <Modal title='Time logs' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        {/* <Table columns={columsModal} dataSource={[]} pagination={false} /> */}
      </Modal>
    </>
  )
}

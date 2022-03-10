import { Modal, Table } from 'antd'
import React from 'react'

export default function DialogTimeSheetReduxModal({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal title='modal' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <div>modalForget</div>
      </Modal>
    </>
  )
}

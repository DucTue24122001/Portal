import { Modal } from 'antd'
import React from 'react'

export default function ModalLeave({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal title='modal' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <div>leave</div>
      </Modal>
    </>
  )
}

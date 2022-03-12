import { Modal } from 'antd'
import React from 'react'

export default function ModalLateEarly({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal title='modal' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <div>late</div>
      </Modal>
    </>
  )
}
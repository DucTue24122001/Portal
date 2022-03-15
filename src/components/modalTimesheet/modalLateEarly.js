import { Modal } from 'antd'
import React from 'react'
import RegisterLateEarly from '../../layouts/components/registerLateEarly/index'

export default function ModalLateEarly({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal
        title='Register Late/Early'
        visible={isModalVisible}
        onOk={onOk}
        onCancel={onCancel}
        style={{ fontWeight: 500 }}
        width={1000}
        footer={null}
      >
        <RegisterLateEarly onCancel={onCancel} onOk={onOk} />
      </Modal>
    </>
  )
}

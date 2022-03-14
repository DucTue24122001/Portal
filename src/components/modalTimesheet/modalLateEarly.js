import { Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ModalLateEarly({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)
  return (
    <>
      <Modal title='modal' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <div>late</div>
      </Modal>
    </>
  )
}

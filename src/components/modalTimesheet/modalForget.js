import React from 'react'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import FormForgetCheck from '../FormForget/FormForgetCheck'

export default function ModalForget({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()

  const onCancel = () => handleCancel()

  const dataModal = useSelector((state) => state.timesheet.modalRowTable)
  return (
    <>
      <Modal
        title='Register Forget Check-in/Check-out'
        visible={isModalVisible}
        footer={false}
        onOk={onOk}
        onCancel={onCancel}
        width={1000}
      >
        <FormForgetCheck onCancel={onCancel} />
      </Modal>
    </>
  )
}

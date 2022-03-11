import { Modal } from 'antd'
import React from 'react'
import FormRegisterLeave from '../FormLeave/FormRegisterLeave'

export default function ModalLeave({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal width={1000} footer={false} title='' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <FormRegisterLeave onCancel={onCancel}/>
      </Modal>
    </>
  )
}

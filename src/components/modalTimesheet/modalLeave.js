import { Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import FormLeave from '../FormLeave/FormLeave'

export default function ModalLeave({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)

  return (
    <>
      <Modal width={1000} footer={false} title='' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <FormLeave dataModal={dataModal} isUser={true} onCancel={onCancel} />
      </Modal>
    </>
  )
}

import { Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import RegisterOT from '../../layouts/components/registerOT'

export default function ModalOT({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)

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
        <RegisterOT onCancel={onCancel} onOk={onOk} />
      </Modal>
    </>
  )
}

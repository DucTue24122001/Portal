import { Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const ModalNoticeEdit = ({ isModalVisible, handleOk, handleCancel }) => {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal title='modal' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <div>edit</div>
      </Modal>
    </>
  )
}
export default ModalNoticeEdit

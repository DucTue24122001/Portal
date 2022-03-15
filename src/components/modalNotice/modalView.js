import { Modal } from 'antd'
import React from 'react'

const ModalNoticeView = ({ isModalVisible, handleOk, handleCancel }) => {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()

  return (
    <>
      <Modal title='modal' visible={isModalVisible} onOk={onOk} onCancel={onCancel}>
        <div>view</div>
      </Modal>
    </>
  )
}
export default ModalNoticeView

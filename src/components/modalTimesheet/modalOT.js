import { Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RegisterOT from '../../layouts/components/registerOT'

export default function ModalOT({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)
  const [status, setStatus] = useState()

  useEffect(() => {
    if (dataModal.requests?.length !== 0) {
      dataModal.requests?.map(request => {
        if (request.request_type === 5) {
          setStatus(request.status)
        }
      })
    }
  }, [])
  return (
    <>
      <Modal
        title='Register OT'
        visible={isModalVisible}
        onOk={onOk}
        onCancel={onCancel}
        style={{ fontWeight: 500 }}
        width={700}
        footer={null}
      >
        <RegisterOT onCancel={onCancel} isUser={true} onOk={onOk} status = {status} dataOT={dataModal} />
      </Modal>
    </>
  )
}

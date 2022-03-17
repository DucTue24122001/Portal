import { Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RegisterLateEarly from '../../layouts/components/registerLateEarly/index'

export default function ModalLateEarly({ isModalVisible, handleOk, handleCancel }) {
  const onOk = () => handleOk()
  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)
  const [status, setStatus] = useState()

  useEffect(() => {
    if (dataModal.requests?.length !== 0) {
      console.log('vao request')
      dataModal.requests?.map(request => {
        if (request.request_type === 4) {
          setStatus(request.status)
        }
      })
    }
  }, [])
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
        <RegisterLateEarly onCancel={onCancel} onOk={onOk} dataLateEarly={dataModal} status={status}/>
      </Modal>
    </>
  )
}

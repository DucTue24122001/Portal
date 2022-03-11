import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import FormRegister from './FormRegister'

const RegisterLeave = () => {
  const [isModalVisiable, setIsModalVisiable] = useState(false)

  const showModal = () => {
    setIsModalVisiable(true)
  }

  const handleCancel = () => {
    setIsModalVisiable(false)
  }

  return (
    <>
      <Button type='link' onClick={showModal}>
        Forget
      </Button>
      <Modal
        title='Register Forget Check-in/Check-out'
        visible={isModalVisiable}
        className='registerForget'
        footer={false}
        onCancel={handleCancel}
        onOk={() => setIsModalVisiable(false)}
        width={1000}
      >
        <FormRegister onCancel={handleCancel} />
      </Modal>
    </>
  )
}

export default RegisterLeave

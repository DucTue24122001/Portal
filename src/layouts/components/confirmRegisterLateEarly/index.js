import React, { useState } from 'react'
import { Row, Col, DatePicker, Button, Modal, Form, Input } from 'antd'
import moment from 'moment'
import 'antd/dist/antd.css'
import style from './confirmLateEarly.module.css'

const ConfirmRegisterLateEarly = () => {
  const [form] = Form.useForm()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [reason, setReason] = useState('')
  const [setDateCoverUp] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleUpdateLateEarly = () => {}

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div className={style.confirmLateEarly}>
      <Button type='primary' onClick={showModal}>Confirm Late Early</Button>
      <Modal
        style={{ fontWeight: 500 }}
        width={700}
        title='Confirm Late/Early'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form}>
          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>Registration date:</Col>
            <Col sm={7}>{moment().format('YYYY-MM-DD HH:mm')}</Col>
          </Row>

          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>Register for date:</Col>
            <Col sm={7}>2022-02-19</Col>
          </Row>

          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>Check-in:</Col>
            <Col xs={14} sm={8}>08:10</Col>
            <Col xs={10} sm={3}>Check-out:</Col>
            <Col sm={7}>17:01</Col>
          </Row>

          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>Late time:</Col>
            <Col xs={14} sm={8}>
              <span style={{ color: 'red' }}>00:10</span>
            </Col>
            <Col sm={3}>Early time:</Col>
            <Col sm={7}></Col>
          </Row>

          <Row className={style.date_corer_up}>
            <Col xs={10} sm={5}>
              Date cover up: <span style={{ color: 'red' }}>(*)</span>
            </Col>
            <Col sm={8}>
              <Form.Item
                name='dateCoverUp'
                rules={[
                  {
                    required: true,
                    message: 'Please input your date cover up!'
                  }
                ]}
              >
                <DatePicker
                  onChange={e => setDateCoverUp(e.format('YYYY-MM-DD'))}
                />
              </Form.Item>
            </Col>
            <Col xs={10} sm={6}>
              Overtime: <b>00:16</b>
            </Col>
            <Col>
              Time request: <span style={{ color: 'red' }}>00:10</span>
            </Col>
          </Row>

          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>
              Reason: <span style={{ color: 'red' }}>(*)</span>
            </Col>
            <Col xs={24} sm={19}>
              <Form.Item
                name='reason'
                rules={[
                  {
                    required: true,
                    message: 'Please input your reason!'
                  }
                ]}
              >
                <Input.TextArea
                  style={{ height: '120px' }}
                  defaultValue={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.status}>
            <Col xs={4} sm={5}>Status:</Col>
            <Col sm={7}>Sent</Col>
          </Row>

          <Row className={style.comment}>
            <Col xs={10} sm={5}>
              Comment:
            </Col>
            <Col xs={24} sm={19}>
              <Input.TextArea
                style={{ height: '120px' }}
              />
            </Col>
          </Row>

          <Row gutter={30} justify='center' >
            <Col>
              <Button type='primary' htmlType='submit' onClick={handleUpdateLateEarly} >Confirm</Button>
            </Col>
            <Col>
              <Button type='danger'>Reject</Button>
            </Col>
            <Col>
              <Button type='dash' onClick={handleCancel}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default ConfirmRegisterLateEarly

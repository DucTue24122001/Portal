import { Modal } from 'antd'
import { Checkbox, Form, DatePicker, TimePicker, Button, Row, Col } from 'antd'
import moment from 'moment'
import style from '../modalCss/forget.module.css'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function ModalForget({ isModalVisible, handleOk, handleCancel }) {
  const initialStatus = {
    1: 'Sent',
    2: 'Confirmed',
    3: 'Approved'
  }
  const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
  const disabledTimePM = [20, 21, 22, 23]
  const [status, setStatus] = useState(initialStatus[1])
  const [hidden, setHidden] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [, setCheckOut] = useState(0)
  const [disabledTimeCheckIn, setDisableTimeCheckIn] = useState([...disabledTimeAM, ...disabledTimePM])

  const onOk = () => handleOk()

  const onCancel = () => handleCancel()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)

  const onFinish = (values) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHidden(true)
    }, 2000)
  }

  const onFinishFailed = () => {}

  const onCheckin = (time) => {
    const disabledTimeCheckOut = []
    if (time) {
      disabledTimeCheckOut.pop()
    } else {
      for (let i = moment(time).hour(); i > 0; i--) {
        disabledTimeCheckOut.push(i)
      }
      setDisableTimeCheckIn([...disabledTimeCheckIn, ...disabledTimeCheckOut])
    }
  }

  const onCheckout = (time) => {
    setCheckOut(time.format('HH:mm'))
  }

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
        <div>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Row className={style.row}>
              <Col span={18} push={6}>
                <Form.Item name='RegistrationDate' className={style.m_0}>
                  <span>{moment().format('DD/MM/YYYY HH:mm')}</span>
                </Form.Item>
              </Col>
              <Col span={5} pull={18}>
                <span>Registration date</span>
              </Col>
            </Row>

            <Row className={style.row}>
              <Col span={18} push={6}>
                <Form.Item name='RegisterForDate' className={style.m_0}>
                  <DatePicker className={style.w_40p} />
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                <label>Register for date</label>
              </Col>
            </Row>

            <Row className={style.row}>
              <Col span={18} push={6}>
                <Form.Item
                  name='CheckIn'
                  className='m-0'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the time'
                    }
                  ]}
                >
                  <TimePicker
                    disabledHours={() => disabledTimeCheckIn}
                    className={style.w_40p}
                    format='HH:mm'
                    onChange={onCheckin}
                  />
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                <label>
                  Check-in: <span style={{ color: 'red' }}>(*)</span>
                </label>
              </Col>
            </Row>

            <Row className={style.row}>
              <Col span={18} push={6}>
                <Form.Item
                  name='CheckOut'
                  className={style.m_0}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the time'
                    }
                  ]}
                >
                  <TimePicker
                    disabledHours={() => disabledTimeCheckIn}
                    className={style.w_40p}
                    format='HH:mm'
                    onChange={onCheckout}
                  />
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                <label>
                  Check-out: <span style={{ color: 'red' }}>(*)</span>
                </label>
              </Col>
            </Row>

            <Row className={style.row}>
              <Col span={18} push={6}>
                <Form.Item name='SpecialReason' className={style.m_0}>
                  <Checkbox.Group>
                    <Checkbox value={'Check not counted as error'}>Check not counted as error</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                <label>Special reason</label>
              </Col>
            </Row>

            <Row className={style.row}>
              <Col span={18} push={6}>
                <Form.Item name='Reason' className={style.m_0}>
                  <textarea rows={6} cols={65} style={{ padding: '5px 10px', border: '1px solid #d9d9d9' }} />
                </Form.Item>
              </Col>
              <Col span={6} pull={18}>
                <label>Reason</label>
              </Col>
            </Row>

            {hidden && (
              <Row className={style.row}>
                <Col span={18} push={6}>
                  <Form.Item className={style.m_0}>
                    <span>{status}</span>
                  </Form.Item>
                </Col>
                <Col span={6} pull={18}>
                  <label>Status: </label>
                </Col>
              </Row>
            )}

            {hidden ? (
              <div className={style.wrapper_button_form}>
                <Button className={style.button_form} type='primary'>
                  Update
                </Button>
                <Button className={style.button_form} type='primary'>
                  Delete
                </Button>
                <Button onClick={() => onCancel()}>Cancel</Button>
              </div>
            ) : (
              <div className={style.wrapper_button_form}>
                <Button loading={isLoading} type='primary' htmlType='submit' className={style.button_form}>
                  Register
                </Button>
                <Button onClick={() => onCancel()}>Cancel</Button>
              </div>
            )}
          </Form>
        </div>
      </Modal>
    </>
  )
}

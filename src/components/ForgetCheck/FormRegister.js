import React, { useState } from 'react'
import { Checkbox, Form, DatePicker, TimePicker, Button, Row, Col } from 'antd'
import './register.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { addForget } from '../redux/actions'
const FormRegister = ({ onCancel }) => {
  const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
  const disabledTimePM = [20, 21, 22, 23]
  const [isStatus, setIsStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [, setCheckOut] = useState(0)
  const [disabledTimeCheckIn, setDisableTimeCheckIn] = useState([...disabledTimeAM, ...disabledTimePM])
  const dispatch = useDispatch()

  const onFinish = (values) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsStatus(true)
    }, 2000)
    dispatch(
      addForget({
        registrationDate: moment().format('DD/MM/YYYY HH:mm'),
        registerForDate: values.RegisterForDate.format('DD/MM/YYYY'),
        checkIn: values.CheckIn.format('HH:mm'),
        checkOut: values.CheckOut.format('HH:mm'),
        specialReason: values.SpecialReason,
        reason: values.Reason
      })
    )
  }

  const onFinishFailed = (error) => {
    console.log(error)
  }

  const onCheckin = (time) => {
    const disabledTimeCheckOut = []
    for (let i = moment(time).hour(); i > 0; i--) {
      disabledTimeCheckOut.push(i)
    }
    setDisableTimeCheckIn([...disabledTimeCheckIn, ...disabledTimeCheckOut])
  }

  const onCheckout = (time) => {
    setCheckOut(time.format('HH:mm'))
  }

  return (
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
        <Row className='mb-10 al-center'>
          <Col span={18} push={6}>
            <Form.Item name='RegistrationDate' className='m-0'>
              <span>{moment().format('DD/MM/YYYY HH:mm')}</span>
            </Form.Item>
          </Col>
          <Col span={5} pull={18}>
            <span>Registration date</span>
          </Col>
        </Row>

        <Row className='mb-10 al-center'>
          <Col span={18} push={6}>
            <Form.Item name='RegisterForDate' className='m-0'>
              <DatePicker className='w-40p' />
            </Form.Item>
          </Col>
          <Col span={6} pull={18}>
            <label>Register for date</label>
          </Col>
        </Row>

        <Row className='mb-10 al-center'>
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
                className='w-40p'
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

        <Row className='mb-10 al-center'>
          <Col span={18} push={6}>
            <Form.Item
              name='CheckOut'
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
                className='w-40p'
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

        <Row className='mb-10 al-center'>
          <Col span={18} push={6}>
            <Form.Item name='SpecialReason' className='m-0'>
              <Checkbox.Group>
                <Checkbox value={'Check-in not counted as error'}>Check-in not counted as error</Checkbox>
                <Checkbox value={'Check-out not counted as error'}>Check-in not counted as error</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col span={6} pull={18}>
            <label>Special reason</label>
          </Col>
        </Row>

        <Row className='mb-10 al-center'>
          <Col span={18} push={6}>
            <Form.Item name='Reason' className='m-0'>
              <textarea rows={6} cols={65} style={{ padding: '5px 10px', border: '1px solid #d9d9d9' }} />
            </Form.Item>
          </Col>
          <Col span={6} pull={18}>
            <label>Reason</label>
          </Col>
        </Row>

        {isStatus && (
          <Row className='mb-10 al-center'>
            <Col span={18} push={6}>
              <Form.Item className='m-0'>
                <span>Sent</span>
              </Form.Item>
            </Col>
            <Col span={6} pull={18}>
              <label>Status: </label>
            </Col>
          </Row>
        )}

        {isStatus ? (
          <div className='wrapper-button-form'>
            <Button className='button-form' type='primary'>
              Update
            </Button>
            <Button className='button-form' type='primary'>
              Delete
            </Button>
            <Button onClick={() => onCancel()}>Cancel</Button>
          </div>
        ) : (
          <div className='wrapper-button-form'>
            <Button loading={isLoading} type='primary' htmlType='submit' className='button-form'>
              Register
            </Button>
            <Button onClick={() => onCancel()}>Cancel</Button>
          </div>
        )}
      </Form>
    </div>
  )
}

export default FormRegister

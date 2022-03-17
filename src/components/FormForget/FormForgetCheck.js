import React, { useEffect, useState } from 'react'
import { Checkbox, Form, TimePicker, Button, Row, Col } from 'antd'
import moment from 'moment'
import style from '../modalCss/forget.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ForgetCheckAction } from '../../redux/forgetCheck'

const FormForgetCheck = ({ onCancel, isUser = false, isManager = false, isAdmin = false, dataModal }) => {
  const [form] = Form.useForm()
  const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
  const disabledTimePM = [20, 21, 22, 23]
  const [status] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [nameStatus, setNameStatus] = useState('')
  const [disabledTimeCheckIn, setDisableTimeCheckIn] = useState([...disabledTimeAM, ...disabledTimePM])
  const dispatch = useDispatch()
  const checkSuccess = useSelector((state) => state.forgetCheck.success)

  const onFinish = (values) => {
    console.log(values.CheckIn.format('HH:mm'))
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    dispatch(ForgetCheckAction.registerForgetCheck({
      request_type: 1,
      request_for_date: moment().format('YYYY-MM-DD'),
      error_count: +!values.SpecialReason,
      create_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      check_in: values.CheckIn.format('HH:mm'),
      check_out: values.CheckOut.format('HH:mm'),
      reason: values.Reason
    }))
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

  const onCheckout = (time) => {}

  useEffect(() => {
    if (status === 0) {
      setNameStatus('Sent')
    } else if (status === 1) {
      setNameStatus('Confimred')
    } else if (status === 2) {
      setNameStatus('Approved')
    } else {
      setNameStatus('Reject')
    }
  }, [])

  return (
    <>
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
            <Col span={5}>
              <span>Registration date</span>
            </Col>
            <Col span={19}>
              <Form.Item name='RegistrationDate' className={style.m_0}>
                <span>{moment().format('DD/MM/YYYY HH:mm')}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Register for date</label>
            </Col>
            <Col span={19}>
              <Form.Item name='RegisterForDate' className={style.m_0}>
                <span>{dataModal.date}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>
                Check-in: <span style={{ color: 'red' }}>(*)</span>
              </label>
            </Col>
            <Col span={6}>
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
                  disabledTime={() => disabledTimeCheckIn}
                  format='HH:mm'
                  onChange={onCheckin}
                />
              </Form.Item>
            </Col>
            <Col span={13}><span>({dataModal.checkin})</span></Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>
                Check-out: <span style={{ color: 'red' }}>(*)</span>
              </label>
            </Col>
            <Col span={6}>
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
                  disabledTime={() => disabledTimeCheckIn}
                  format='HH:mm'
                  onChange={onCheckout}
                />
              </Form.Item>
            </Col>
            <Col span={13}><span>({dataModal.checkout})</span></Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Special reason</label>
            </Col>
            <Col span={19}>
              <Form.Item name='SpecialReason' className={style.m_0}>
                <Checkbox.Group>
                  <Checkbox value={'Check not counted as error'} >Check not counted as error</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Reason</label>
            </Col>
            <Col span={19}>
              <Form.Item name='Reason' className={style.m_0}>
                <textarea rows={6} cols={65} style={{ padding: '5px 10px', border: '1px solid #d9d9d9' }} />
              </Form.Item>
            </Col>
          </Row>

          {checkSuccess && (
            <Row className={style.row}>
              <Col span={5}>
                <label>Status: </label>
              </Col>
              <Col span={19}>
                <Form.Item className={style.m_0}>
                  <span>{nameStatus}</span>
                </Form.Item>
              </Col>
            </Row>
          )}

          {checkSuccess ? (
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
    </>
  )
}

export default FormForgetCheck

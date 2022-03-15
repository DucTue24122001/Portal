import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, DatePicker, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'
import style from './registerLateEarly.module.css'
import moment from 'moment'
import { LateEarlyActions } from '../../../redux/lateEarly'

const RegisterLateEarly = ({ onCancel, onOk }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [dateCoverUp, setDateCoverUp] = useState('')
  const [reason, setReason] = useState('')

  const handleRegister = () => {
    const value = {
      compensation_date: dateCoverUp,
      reason: reason,
      status: 'sent'
    }
    if (reason !== '' && dateCoverUp !== 0) {
      dispatch(LateEarlyActions.registerLateEarly(value))
      setReason('')
      setDateCoverUp('')
      onOk()
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <div className={style.registerLateEarly}>
      <Form form={form}>
        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Registration date:
          </Col>
          <Col sm={7}>{moment().format('YYYY-MM-DD HH:mm')}</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Register for date:
          </Col>
          <Col sm={7}>2022-02-19</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Check-in:
          </Col>
          <Col xs={14} sm={8}>
            08:10
          </Col>
          <Col xs={10} sm={2}>
            Check-out:
          </Col>
          <Col sm={7}>17:01</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Late time:
          </Col>
          <Col xs={14} sm={8}>
            <span style={{ color: 'red' }}>00:10</span>
          </Col>
          <Col sm={2}>Early time:</Col>
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
              <DatePicker onChange={(e) => setDateCoverUp(e.format('YYYY-MM-DD'))} />
            </Form.Item>
          </Col>
          <Col xs={10} sm={2}>
            Overtime:
          </Col>
          <Col sm={4}>
            <b>00:16</b>
          </Col>
          <Col sm={3}>Time request:</Col>
          <Col sm={2}>
            <span style={{ color: 'red' }}>00:10</span>
          </Col>
        </Row>

        <Row className={style.reason}>
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
                onChange={(e) => setReason(e.target.value)}
                showCount maxLength={100}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30} justify='center'>
          <Col>
            <Button type='primary' htmlType='submit' onClick={handleRegister}>
              Register
            </Button>
          </Col>
          <Col>
            <Button type='dash' onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default RegisterLateEarly

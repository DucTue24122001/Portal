import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { registerOT } from '../../../redux/registerOT'
import { OtAction } from '../../../redux/registerOT'
import { Row, Col, TimePicker, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'
import style from './registerOT.module.css'
import moment from 'moment'

const format = 'HH:mm'

const RegisterOT = ({ onCancel, onOk }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const registerOtLoading = useSelector((state) => state.registerOT.loading)

  const [reason, setReason] = useState('')
  const [actualOvertime] = useState(40 * 60)
  const [requestOT, setRequestOT] = useState(0)

  const handleRegisterOT = () => {
    const value = {
      compensation_date: moment().format('YYYY-MM-DD HH:mm'),
      request_for_date: 1646971964,
      check_in: 1646971964,
      check_out: 1646971964,
      request_ot: requestOT,
      actual_overtime: actualOvertime,
      reason: reason
    }
    if (reason !== '' && requestOT !== 0) {
      setTimeout(dispatch(OtAction.registerOt(value)), 6000)
      setReason('')
      setRequestOT(0)
      onOk()
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setReason('')
    setRequestOT(0)
    onCancel()
  }

  const handleChangeTimeRequestOT = (time, timeString) => {
    const totalTimeRequestOtSecond = moment.duration(time.format('HH:mm:ss')).asSeconds()
    if (totalTimeRequestOtSecond > actualOvertime) {
      alert('Thời gian request OT không lớn hơn thời gian Overtime Actual')
    } else {
      setRequestOT(totalTimeRequestOtSecond)
    }
  }

  return (
    <div className={style.registerOT}>
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

        <Row className={style.rowCheckIn}>
          <Col xs={10} sm={5}>
              Check-in:
          </Col>
          <Col xs={14} sm={8}>
              08:00
          </Col>
          <Col xs={10} sm={3}>
              Check-out:
          </Col>
          <Col sm={7}>18:40</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
              Request OT:{' '}
          </Col>
          <Col xs={14} sm={8}>
            <Form.Item
              name='requestOT'
              rules={[
                {
                  required: true,
                  message: 'Please input your request OT!'
                }
              ]}
            >
              <TimePicker onChange={handleChangeTimeRequestOT} format={format} />
            </Form.Item>
          </Col>
          <Col sm={5}>Actual Overtime:</Col>
          <Col sm={6}>00:40</Col>
        </Row>

        <Row>
          <b>Note:</b>
        </Row>
        <Row className={style.content__note}>
          <p>-Thời gian bắt đầu được tính OT là sau 01:00 sau giờ kết thúc làm việc chính thức.</p>
          <p className={style.content__note_example}>
            <i>Ví dụ: Ca làm việc 08:00 AM đến 17:00 PM, thì thời gian gian bắt đầu tính OT là 18:00 PM.</i>
          </p>
          <p>
              -Thời gian request OT<span style={{ color: 'red' }}> không lớn hơn </span>thời gian Overtime Actual. Các
              trường hợp OT khi remote cần yêu cầu qua email.
          </p>
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
              <Input.TextArea style={{ height: '120px' }} onChange={(e) => setReason(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30} justify='center'>
          <Col>
            <Button type='primary' htmlType='submit' loading={registerOtLoading} onClick={handleRegisterOT}>
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

export default RegisterOT
